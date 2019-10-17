var c1 = (function() {
    function Student() {
        var _id;
        var _name;
        var _course;
        var _fraction;

        function setId(id) {
            _id = id;
        }

        function setName(name) {
            _name = name;
        }

        function setCourse(course) {
            _course = course;
        }

        function setfraction(fraction) {
            _fraction = fraction;
        }


        function getId() {
            return _id;
        }

        function getName() {
            return _name;
        }

        function getCourse() {
            return _course;
        }

        function getfraction() {
            return _fraction;
        }

        function toString() {
            return _id + '\t' + _name + '\t' + _course + '\t' + _fraction;
        }

        return {
            setId: setId,
            setName: setName,
            getId: getId,
            getName: getName,
            setCourse: setCourse,
            setfraction: setfraction,
            getCourse: getCourse,
            getfraction: getfraction,
            toString: toString

        }
    }


    function StudentService() {
        var _studentService = [
            { id: '001', name: '落凤', course: 'web开发', fraction: '80' },
            { id: '002', name: '忻斯', course: '嵌入式', fraction: '76' },
            { id: '003', name: '阔尔', course: 'RFID', fraction: '90' },
            { id: '004', name: '西渡', course: 'RFID', fraction: '78' }
        ];

        return {
            stu_data: _studentService
        }
    }

    function StudentList() {
        var _student = [];

        function add(student) {
            if (student.getName() == "" || student.getId() == "") {
                confirm("输入有误， 请检查后重新输入");
            }
            for (let i = 0; i < _student.length; i++) {
                if (_student[i].getId() == student.getId()) {
                    confirm("id号冲突");
                }
            }
            _student.push(student);
        }

        function remove(id) {
            for (let i = 0; i < _student.length; i++) {
                if (_student[i].getId() === id) {
                    _student.splice(i, 1);
                    return;
                }
            }

            confirm("未找到课程");
        }

        function StugetAll() {
            return _student;
        }

        function getById(id) {
            for (let i = 0; i < _student.length; i++) {
                if (_student[i].getId() === id) {
                    return _student[i];
                }
            }
            return null;
        }

        function getByName(name) {
            let result = [];
            for (let stu of _student) {
                if (stu.getName().indexOf(name) >= 0) {
                    result.push(stu);
                }
            }
            return result;
        }

        function getByCourse(course) {
            let result = [];
            for (let stu of _student) {
                if (stu.getCourse().indexOf(course) >= 0) {
                    result.push(stu);
                }
            }
            return result;
        }


        function getByFranction(fraction) {
            let result = [];
            for (let stu of _student) {
                if (stu.getfraction().indexOf(fraction) >= 0) {
                    result.push(stu);
                }
            }
            return result;
        }


        function update_Stu(id, name, course, fraction) {
            for (let stu of _student) {
                if (stu.getId() === id) {
                    stu.setName(name);
                    stu.setCourse(course);
                    stu.setfraction(fraction);

                }
            }
            return;
        }

        function update_Stu_Only(course, course_change) {
            for (let stu of _student) {
                if (stu.getCourse() == course) {
                    stu.setCourse(course_change);
                }
            }
            return;
        }




        function toString() {
            let str = '';
            for (let i = 0; i < _student.length; i++) {
                str += _student[i].toString();
                str += '\n';
            }
            return str;
        }


        return {
            add: add,
            remove: remove,
            getById: getById,
            getByName: getByName,
            update_Stu: update_Stu,
            toString: toString,
            StugetAll: StugetAll,
            getByCourse: getByCourse,
            getByFranction: getByFranction,
            update_Stu_Only: update_Stu_Only
        }


    }


    return {
        Student: Student,
        StudentList: StudentList,
        StudentService: StudentService
    }
}())