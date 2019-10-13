var c2 = (function() {
    function Course() {
        var _id;
        var _name;

        function setId(id) {
            _id = id;
        }

        function setName(name) {
            _name = name;
        }

        function getId() {
            return _id;
        }

        function getName() {
            return _name;
        }

        function toString() {
            return _id + '\t' + _name;
        }

        return {
            setId: setId,
            setName: setName,
            getId: getId,
            getName: getName,
            toString: toString
        }
    }



    function CourseService() {
        var _coursesData = [
            { id: '001', name: 'web开发' },
            { id: '002', name: '嵌入式' },
            { id: '003', name: '网络安全' },
            { id: '004', name: 'RFID' }
        ];

        return {
            data: _coursesData
        }
    }

    function CourseList() {
        var _courses = [];

        function add(course) {
            // 1) course可能是空
            if (course.getId() === "" || course.getName() === "") {
                confirm('输入为空');
                return;
            }
            // 2) 重复添加课程
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === course.getId()) {
                    console.log('不能重复添加课程!');
                    return;
                }
            }

            _courses.push(course);
        }

        function remove(id) {
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === id) {
                    _courses.splice(i, 1);
                    return;
                }
            }

            console.log('未能找到该课程:' + id);
        }

        function getAll() {
            return _courses;
        }

        function getById(id) {
            for (let i = 0; i < _courses.length; i++) {
                if (_courses[i].getId() === id) {
                    return _courses[i];
                }
            }
            for (let course of _courses) {
                if (course.getId() === id) {
                    return course;
                }
            }
            return null;
        }

        function getByName(name) {
            let result = [];
            for (let course of _courses) {
                if (course.getName().indexOf(name) >= 0) {
                    result.push(course);
                }
            }
            return result;
        }


        function update(id, name) {
            for (let course of _courses) {
                if (course.getId() === id) {
                    course.setName(name);
                }
            }
            return;
        }

        function toString() {
            let str = '';
            for (let i = 0; i < _courses.length; i++) {
                str += _courses[i].toString();
                str += '\n';
            }
            return str;
        }

        return {
            add: add,
            remove: remove,
            getAll: getAll,
            getById: getById,
            getByName: getByName,
            update: update,
            toString: toString
        }

    }
    return {
        Course: Course,
        CourseList: CourseList,
        CourseService: CourseService
    }
}())