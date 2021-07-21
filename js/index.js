/* localStorage.setItem('students', 'nguyễn văn A') */

function save(){
    
    if(editMode){
        updateDataStudent()
    }
    else{
        //lấy "giá trị" từ tag có ID tương ứng
    let idInput = document.getElementById('idInput').value
    var nameInput = document.getElementById('nameInput').value
    var phoneInput = document.getElementById('phoneInput').value

    // kiểm tra điều kiện nếu ở ô ID
    if(_.isEmpty(idInput)) {
        document.getElementById('id-warning').innerHTML = 'ID chưa được nhập'
    } else{
        document.getElementById('id-warning').innerHTML = ''
    }
    
    if(_.isEmpty(nameInput)) {
        document.getElementById('name-warning').innerHTML = 'Tên chưa được nhập'
    } else if(nameInput.length <= 2) {d
        document.getElementById('name-warning').innerHTML = 'Tên phải dài hơn 2 ký tự'
    } else {
        document.getElementById('name-warning').innerHTML = ''
    }
     
    if(_.isEmpty(phoneInput)) {
        document.getElementById('phone-warning').innerHTML = 'Số điện thoại chưa được nhập'
    } else{
        document.getElementById('phone-warning').innerHTML = ''
    }

    // nếu như 3 ô input trên thỏa điều kiện thì thự hiện lưu
    if(idInput && nameInput && phoneInput){

        //khai báo object để lưu giá trị nhập vào cho 3 biến
        var student = {
            //key      : value 
            idInput    : idInput,
            nameInput  : nameInput,
            phoneInput : phoneInput
        }
        // đảm bảo biến này luôn luôn là mảng
        var students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [] 
        
        // đẩy dữ liệu đã lưu mảng được lưu ở local storage
        students.push(student);

        // lấy dữ liệu từ local storage để hiển thị 
        localStorage.setItem('students', JSON.stringify(students)) ;

        //gọi hàm hiển thị để mỗi lần add thêm sinh viên sẽ hiển thị
        this.renderList();  
    }
    }
}

function setHTML(selector, html){
    var element = document.querySelector(selector)
    element.innerHTML = html
}

function renderList(){
    // đảm bảo biến string này luôn luôn là mảng
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [] 
    if(students.length === 0)
        return false;

    //khai báo header của table
    let contentTable =  `<thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">ID</th>
          <th scope="col">Tên sinh viên</th>
          <th scope="col">Số điện thoại</th>
          <th scope="col">Action</th>
        </tr>
      </thead>`;

      // dùng => thay cho arrow function
      // hàm forEach truyền vào mảng có student và index để arrow function thực thi
      students.forEach((student, index) => {
        // khaibao index để xác định mỗi row có định mỗi lần add index sẽ tăng
        let studentId = index;
        index++;
        //công thêm bảng
        contentTable += `
        <tr>
          <th scope="row">${index}</th>
          <td scope="row">${student.idInput}</td>
          <td scope="row">${student.nameInput}</td>
          <td scope="row">${student.phoneInput}</td>
          <td scope="row">
            <button onclick="onDeleteStudent(${studentId})" type="button" class="btn btn-danger"> Xóa </button>
            <button onclick="editStudent(${studentId})" type="button" class="btn btn-dark"> Chỉnh sửa </button>
          </td>     
        </tr>` 
        
        //hiển thị bảng
        setHTML('#dataTable', contentTable)
    })
}

function onDeleteStudent(id){
    //hiển thị xác nhận xóa
    if(confirm('Are you sure ???')){
        //lấy item từ ls để thực thi xóa
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
        //xóa theo id đã được chọn với số lượng xóa là 1
        students.splice(id, 1);
        //đưa vào lại cho ls
        localStorage.setItem('students', JSON.stringify(students));
        renderList();
    }
}

//Update  
var editMode = false

function enableEditMode(){
    editMode = true
}

function disableEditMode(){
    editMode = false
}

function editStudent(id){
    //duyet trong localstorage và lấy giá trị trương ứng mỗi khi onclick
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []
    //gán object đã lấy được thành 1 biến 
    var student = students[id];
    
    // gọi hàm với các class và tham số thứ 2 tương ứng
    setInputValue('.container .id-Input', student.idInput)
    setInputValue('.container .name-Input', student.nameInput)
    setInputValue('.container .phone-Input', student.phoneInput)


    enableEditMode();
    setHTML('.row .btn-add', 'Cập nhật')
    
}

// hàm lấy giá trị ở dòng rồi đưa lại bảng đăng kí
function setInputValue(selector, value){
    var element = document.querySelector(selector)
    element.value = value
}

function updateDataStudent(id){
    //loc ra danh sach
    let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : []

    var idInput = document.getElementById('idInput').value
    var nameInput = document.getElementById('nameInput').value
    var phoneInput = document.getElementById('phoneInput').value

    var student = {
        idInput,
        nameInput,
        phoneInput
    }

    console.log(student)

   /*  localStorage.setItem('students', JSON.stringify(students))
    renderList() */

}    
   
 /*
    students[studentIdTemp] = {
        idInput,
        nameInput,
        phoneInput
    }
    console.log(students)
    
    //lưu dữ liệu ở local storage
    localStorage.setItem(students[studentIdTemp], JSON.stringify(students))

    renderList();
    disableEditMode();
    setHTML('.row .btn-add', 'Thêm') */


//hàm lấy ID