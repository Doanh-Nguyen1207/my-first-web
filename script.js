const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirm-password");
//1. Show error when key change

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;
const emailErrorMessage = "Mời nhập email theo đúng định dạng abc@abc.abc";
const passwordErrorMessage =
  "Mời nhập password theo đúng định dạng: Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa,chữ cái viết thường, ký tự đặc biệt!";
const confirmPasswordErrorMessage =
  "Hai password không trùng nhau, mời nhập lại!";
const notEnoughLengthMessage = "Không được để trống ô này";

function isSamePasswordCheck(pw, cfpw, error) {
  return function () {
    const cfpwErrorNode = cfpw.parentElement.lastElementChild;
    const pwValue = pw.value.trim();
    const cfpwValue = cfpw.value.trim();
    isSamePassword = pwValue === cfpwValue;
    if (!isSamePassword) {
      cfpwErrorNode.classList.add("error");
      cfpwErrorNode.textContent = error;
    } else {
      cfpwErrorNode.classList.remove("error");
    }
  };
}

function eventOnkeyupRegex(input, regex, error) {
  return function () {
    const inputErrorNode = input.parentElement.lastElementChild;
    const inputValue = input.value.trim();
    const isValidInput = inputValue.match(regex);
    if (!isValidInput && inputValue) {
      inputErrorNode.classList.add("error");
      inputErrorNode.textContent = error;
    } else if (isValidInput || inputValue) {
      inputErrorNode.classList.remove("error");
    }
  };
}

confirmPassword.onkeyup = isSamePasswordCheck(
  password,
  confirmPassword,
  confirmPasswordErrorMessage
);
email.onkeyup = eventOnkeyupRegex(email, regexEmail, emailErrorMessage);
password.onkeyup = eventOnkeyupRegex(
  password,
  regexPassword,
  passwordErrorMessage
);

/*--------------------------------------------------------------------*/

//2. Show error when click button
btnSignup.onclick = function (e) {
  e.preventDefault();
  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const regexPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

  const emailErrorNode = email.parentElement.lastElementChild;
  const passwordErrorNode = password.parentElement.lastElementChild;
  const fullNameErrorNode = fullName.parentElement.lastElementChild;
  const confirmPasswordErrorNode =
    confirmPassword.parentElement.lastElementChild;
  //Check validate email enter
  const emailValue = email.value.trim();
  const isValidEmail = emailValue.match(regexEmail);
  if (!isValidEmail) {
    emailErrorNode.classList.add("error");
    emailErrorNode.textContent =
      "Mời nhập email theo đúng định dạng abc@abc.com";
  }

  //Check validate password enter
  passwordValue = password.value.trim();
  const isValidPassword = passwordValue.match(regexPassword);
  if (!isValidPassword) {
    passwordErrorNode.classList.add("error");
    passwordErrorNode.textContent =
      "Mời nhập password theo đúng định dạng: Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa,chữ cái viết thường, ký tự đặc biệt!";
  }

  //Check validate password comparison
  const confirmPasswordValue = confirmPassword.value.trim();
  const isSamePassword = passwordValue === confirmPasswordValue;
  if (!isSamePassword) {
    confirmPasswordErrorNode.classList.add("error");
    confirmPasswordErrorNode.textContent =
      "Hai password không trùng nhau, mời nhập lại!";
  }
  //Check full name length = 0
  const fullNameValue = fullName.value.trim();
  if (!fullNameValue) {
    fullNameErrorNode.classList.add("error");
    fullNameErrorNode.textContent = "Không được bỏ trống ô full name";
  }
  //Check email length =0
  if (!emailValue) {
    emailErrorNode.classList.add("error");
    emailErrorNode.textContent = "Không được bỏ trống ô email";
  } else if (emailValue.match(regexEmail)) {
    emailErrorNode.classList.remove("error");
  }
  //Check password length = 0
  if (!passwordValue) {
    passwordErrorNode.classList.add("error");
    passwordErrorNode.textContent = "Không được bỏ trống ô password";
  } else if (passwordValue.match(regexPassword)) {
    passwordErrorNode.classList.remove("error");
  }
  //Check confirm password length = 0
  if (!confirmPasswordValue) {
    confirmPasswordErrorNode.classList.add("error");
    confirmPasswordErrorNode.textContent =
      "Không được bỏ trống ô confirm password";
  } else if (isSamePassword) {
    confirmPasswordErrorNode.classList.remove("error");
  }
  //Regiter success
  if (isValidEmail && isValidPassword && isSamePassword) {
    //Save email, password to usersSignup and navigate to login page
    let userListLocal = JSON.parse(localStorage.getItem("usersList")) ?? [];
    const userLogin = {
      fullName: fullNameValue,
      email: emailValue,
      password: passwordValue
    };
    console.log(userListLocal);
    const isRepeatUser = userListLocal.some((user) => {
      return (
        userLogin.email === user.email && userLogin.password === user.password
      );
    });
    if (!isRepeatUser) {
      userListLocal.push(userLogin);
    }
    localStorage.setItem("usersList", JSON.stringify(userListLocal));
    location.href = "./index.html";
  }
};
// const userLogin = [
//   {
//     fullName: "aa",
//     email: "aa@aa.aa",
//     password: "19124321My@"
//   }
// ];
// localStorage.setItem("usersList", JSON.stringify(userLogin));
//navigate to home page if logged
const userLogged = JSON.parse(localStorage.getItem("userLogged")) ?? [];

const signupLink = document.querySelector(".signup-link");
const loginLink = document.querySelector(".login-link");

if (userLogged.email) {
  window.location = "homepage.html";
}
