import './style.scss'
import 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.min.js'
import Joi from 'joi';

function navigation_slide() {
    const burger = document.querySelector('.burger');
    const navigation = document.querySelector('.links');
    const navigation_links = document.querySelectorAll('.links li');

    burger.addEventListener('click', () =>
    {
        if (navigation.getAttribute("data-state") == "active")
        {
            navigation.setAttribute("data-state", "inactive");
        } else
        {
            navigation.setAttribute("data-state", "active");
        }

        navigation_links.forEach((link, index) =>
        {
            if (link.style.animation)
            {
                link.style.animation = ""
            } else
                link.style.animation = `naviagtionLinkFade 0.5s ease forwards ${index / 5 + 0.3}s`
        })

        burger.classList.toggle('toggle');
    })
}

function register_angular() {
    const angular_app = angular.module("registerModule", []).controller("registerController", function ($scope, $http) {
        const test_schema = Joi.object({
            profession: Joi.string().required(),
            name: Joi.string().required(),
            email: Joi.string().email({tlds: {allow: false}}).required(),
            password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/).required()
        })

        $scope.register = function () {

            const data = {
                profession: $scope.profession,
                name: $scope.name,
                email: $scope.email,
                password: $scope.password
            }

            const result = test_schema.validate(data, {abortEarly: false});

            if (result.error) {
                result.error.details.forEach(err => {
                    if (err.path[0] == "email")
                        $scope.email_error = "Please enter a valid email" 
                    else if (err.path[0] == "password")
                        $scope.password_error = "Please enter a valid password containing at least 8 characters, one uppercase, one lowercase, one number and one special character"
                    else if (err.path[0] == "name")
                        $scope.name_error = "Please enter your name"
                    else 
                        $scope.profession_error = "Please enter a profession"
                })
            } else {
                $http({
                    method: 'POST',
                    url: 'http://localhost:6174/api/auth/register',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data
                }).then(res => console.log('success', res), res => alert(res.data.reason))

                $http.post("http://localhost:6174/api/auth/register", {
                    data
                }).then(res => {
                    alert("Registered!")
                    window.localStorage.setItem("user", res.data.user)
                    window.location.href = "/"
                }, res => {
                    if (res.data.code == 0) {
                        alert("Something went wrong");
                    } else if (res.data.code == 1) {
                        alert("Email already in use, try loging in");
                    } else {
                        alert("Something went wrong");
                    }
                });
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

initialise()