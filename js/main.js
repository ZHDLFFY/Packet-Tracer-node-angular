const express = require('express');
var mysql = require('mysql');
const app = express();
const course_data = [
    { id: '001', name: 'web开发' },
    { id: '002', name: '嵌入式' },
    { id: '003', name: '网络安全' },
    { id: '004', name: 'RFID' }
];


const stu_data = [
    { id: '001', name: '落凤', course: 'web开发', fraction: 80 },
    { id: '002', name: '忻斯', course: '嵌入式', fraction: 76 },
    { id: '003', name: '阔尔', course: 'RFID', fraction: 90 },
    { id: '004', name: '西渡', course: 'RFID', fraction: 78 }
];

app.get('/', (req, res) => res.send("Hello?World!"));
app.get('/courses', (req, res) => res.send(JSON.stringify(stu_data))); //数组转化为字符串

app.get('/user', function(req, res) {


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    var sql = 'SELECT * FROM user';
    //查
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('失败');
            return;
        }
        const users = [];
        for (let item of result) {
            users.push({
                id: item.id,
                username: item.name,
                password: item.password
            })
        }
        res.send(JSON.stringify(users));

    });



    connection.end();

})

app.post('/user', function(req, res) {
    console.log(JSON.stringify(req.query));
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    var sql = 'SELECT * FROM user';
    //查
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('失败');
            return;
        }

        console.log('--------------------------SELECT----------------------------');

        if (result <= 0) {
            res.send(JSON.stringify({
                succ: false,
                msg: 'Login Fail'
            }))
        } else {
            for (let item of result) {
                if (item.name == req.query.name && item.password == req.query.password) {
                    res.send(JSON.stringify({
                        succ: true,
                        msg: 'Login success'
                    }));
                } else {
                    res.send(JSON.stringify({
                        succ: false,
                        msg: '用户名或密码错误'

                    }));
                    return;

                }
                return;
            }
            return;
        }

        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();

})

/*
restful
*/

/*跨域访问*/
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
        /让options请求快速返回/
    } else {
        next();
    }
});

app.put('/led/:id/:status', function(req, res) {
    const id = req.params["id"];
    const status = req.params["status"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    let sql = "UPDATE device SET status='" + status + "'WHERE id=\'" + id + "\'";

    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send("修改错误");
            return;
        }

        let sql2 = "SELECT *FROM device WHERE id='" + id + "'";
        connection.query(sql2, function(err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                res.send("修改错误");
                return;
            }
            const obj = {
                id: id,
                status: result[0].customer_status,
            }
            res.send(JSON.stringify(obj));
        });

        connection.end();

    })

});



app.post('/led/:id/:status', function(req, res) {
    let id = req.params["id"];
    let status = req.params["status"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });
    connection.connect();

    let sql = "UPDATE device SET customer_status=" + status + " WHERE id='" + id + "'";
    console.log(sql);

    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '修改失败！'
            }));
            return;
        }
        res.send(JSON.stringify({
            succ: true,
            msg: '修改成功！'
        }));


        connection.end();

    })


})




app.get('/led/:id', function(req, res) {

    const id = req.params["id"];

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();

    var sql = 'SELECT * FROM device';
    //查
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('失败');
            return;
        }
        const resp = {
            id: id,
            status: result[0].status,
            customer_status: result[0].customer_status
        }
        res.send(JSON.stringify(resp))

    });

    connection.end();

})



app.post('/led/:id', function(req, res) {
    let id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });
    connection.connect();

    let sql = "INSERT INTO device  VALUES ('" + id + "',0,0)";
    console.log(sql);
    let callBack = function(err, result) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '插入错误'

            }));
            return;
        }
        res.send(JSON.stringify({
            succ: true,
            msg: '插入成功'

        }));
    };
    connection.query(sql, callBack);
    connection.end();


})


app.get('/led', function(req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'meetingroom'
    });

    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function(err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }

        res.send(JSON.stringify(result));
    });
    connection.end();
});



app.use(express.static('dist'));
app.listen(3000, () => console.log("Example? app? listening? on? port? 3000!"));