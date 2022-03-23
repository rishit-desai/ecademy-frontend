import './style.scss'
import 'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.2/angular.min.js'

function navigation_slide()
{
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

function navigation_shadow()
{
    var navbar = document.querySelector(".primary-header");
    if (window.pageYOffset > 0)
    {
        navbar.classList.add("shadow")
    } else
    {
        navbar.classList.remove("shadow");
    }
}

/**
 * Initialises all the functions.
 * Add your function which needs to run at start to this function 
 */
async function initialise()
{
    navigation_slide();
    window.onscroll = () => navigation_shadow();
}

initialise()