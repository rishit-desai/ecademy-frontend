import "./style.scss";
import "https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.min.js";
import Joi from "joi";

function navigation_slide() {
	const burger = document.querySelector(".burger");
	const navigation = document.querySelector(".links");
	const navigation_links = document.querySelectorAll(".links li");

	burger.addEventListener("click", () => {
		if (navigation.getAttribute("data-state") == "active") {
			navigation.setAttribute("data-state", "inactive");
		} else {
			navigation.setAttribute("data-state", "active");
		}

		navigation_links.forEach((link, index) => {
			if (link.style.animation) {
				link.style.animation = "";
			} else
				link.style.animation = `naviagtionLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`;
		});

		burger.classList.toggle("toggle");
	});
}

function register_angular() {
    const angular_app = angular.module("loginModule", []).controller("loginController", function ($scope, $http) {
        const test_schema = Joi.object({
            email: Joi.string().email({tlds: {allow: false}}).required(),
            password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/).required()
        })

        $scope.login = function () {
            const result = test_schema.validate({
                email: $scope.email,
                password: $scope.password
            }, {abortEarly: false});
            if (result.error) {
                result.error.details.forEach(err => {
                    if (err.path[0] == "email")
                        $scope.email_error = "Please enter a valid email" 
                    else
                        $scope.password_error = "Please enter a valid password containing at least 8 characters, one uppercase, one lowercase, one number and one special character"
                })
            } else {
                try {
                    $http.post("http://localhost:6174/api/auth/login", {
                        email: $scope.email,
                        password: $scope.password
                    }).then(res => {
                        alert("Logged In!")
                        window.localStorage.setItem("user", res.data.user)
                        window.location.href = "/"
                    }, res => {
                        if (res.data.code == 0) {
                            alert("Invalid email or password");
                        } else if (res.data.code == 1) {
                            alert("Wrong password, try again");
                        } else {
                            alert("Something went wrong");
                        }
                    });
                } catch (ignored) {}
            }
        }

        $scope.remove_error = function (type) {
            eval(`$scope.${type}_error = ""`);
        }
    });
}

/**
 * Initialises all the functions.
 * Add your function which needs to run at start to this function
 */
async function initialise() {
	navigation_slide();
    register_angular();
}

initialise();
