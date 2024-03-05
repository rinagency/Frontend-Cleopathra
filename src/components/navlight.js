import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoDark from '../assets/images/logo-dark.png'
import logoWhite from "../assets/images/logo-white.png"
import logoLight from '../assets/images/logo-light.png'

export default function NavLight(){
    const [toggleMenu, setToggleMenu] = useState(false)
    const [scroll, setScroll] = useState(false);

    useEffect(()=>{
        activateMenu()
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
          });
    },[])

     /*********************/
 /*    Menu Active    */
 /*********************/
 function getClosest(elem, selector) {
 
    // Element.matches() polyfill
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector ||
            Element.prototype.oMatchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            function (s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {}
                return i > -1;
            };
    }

    // Get the closest matching element
    for (; elem && elem !== document; elem = elem.parentNode) {
        if (elem.matches(selector)) return elem;
    }
    return null;

};

function activateMenu() {
    var menuItems = document.getElementsByClassName("sub-menu-item");
    if (menuItems) {

        var matchingMenuItem = null;
        for (var idx = 0; idx < menuItems.length; idx++) {
            if (menuItems[idx].href === window.location.href) {
                matchingMenuItem = menuItems[idx];
            }
        }

        if (matchingMenuItem) {
            matchingMenuItem.classList.add('active');
         
         
            var immediateParent = getClosest(matchingMenuItem, 'li');
      
            if (immediateParent) {
                immediateParent.classList.add('active');
            }
            
            var parent = getClosest(immediateParent, '.child-menu-item');
            if(parent){
                parent.classList.add('active');
            }

            var parent = getClosest(parent || immediateParent , '.parent-menu-item');
        
            if (parent) {
                parent.classList.add('active');

                var parentMenuitem = parent.querySelector('.menu-item');
                if (parentMenuitem) {
                    parentMenuitem.classList.add('active');
                }

                var parentOfParent = getClosest(parent, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            } else {
                var parentOfParent = getClosest(matchingMenuItem, '.parent-parent-menu-item');
                if (parentOfParent) {
                    parentOfParent.classList.add('active');
                }
            }
        }
    }
}
/*********************/
/*  Clickable manu   */
/*********************/
if (document.getElementById("navigation")) {
    var elements = document.getElementById("navigation").getElementsByTagName("a");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].onclick = function (elem) {
            if (elem.target.getAttribute("href") === "#") {
                var submenu = elem.target.nextElementSibling.nextElementSibling;
                submenu.classList.toggle('open');
            }
        }
    }
}

    return(
        <>
        <nav id="topnav" className={`${scroll ? "nav-sticky" : "" } defaultscroll is-sticky`}>
            <div className="container">
                <Link className="logo" to="/">
                    <span className="inline-block dark:hidden">
                        <img src={logoDark} className="h-6 l-dark" alt=""/>
                        <img src={logoWhite} className="h-6 l-light" alt=""/>
                    </span>
                    <img src={logoLight} className="h-6 hidden dark:inline-block" alt=""></img>
                </Link>
               
                <div className="menu-extras">
                    <div className="menu-item">
                        <Link className={`${toggleMenu ? 'open' : ''} navbar-toggle`}  onClick={()=>setToggleMenu(!toggleMenu)}>
                            <div className="lines">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <ul className="buy-button list-none mb-0">
                    <li className="inline mb-0">
                        <Link to="/login">
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Login</span>
                            <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Login</span>
                        </Link>
                    </li>
            
                    <li className="md:inline hidden ps-1 mb-0 ">
                        <Link to="/signup" target="_blank" className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Signup</Link>
                    </li>
                </ul>
                <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
                    <ul className="navigation-menu nav-light">
                        <li className="has-submenu parent-menu-item">
                            <Link to="#">Home</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link to="/" className="sub-menu-item">Hero One</Link></li>
                                <li><Link to="/index-two" className="sub-menu-item">Hero Two</Link></li>
                                <li><Link to="/index-three" className="sub-menu-item">Hero Three</Link></li>
                                <li><Link to="/index-light" className="sub-menu-item">Hero Light <span className="bg-gray-50 dark:bg-slate-800 text-[10px] shadow shadow-gray-300 dark:shadow-gray-700 font-bold px-2.5 py-0.5 rounded h-5 ms-1">Light</span></Link></li>
                            </ul>
                        </li>

                
                        <li><Link to="/aboutus" className="sub-menu-item">About Us</Link></li>
                        <li><Link to="/pricing" className="sub-menu-item">Pricing </Link></li>
                
                        <li className="has-submenu parent-parent-menu-item">
                            <Link to="#">Pages</Link><span className="menu-arrow"></span>
                            <ul className="submenu">
                                <li><Link to="/services" className="sub-menu-item">Services</Link></li>
                        
                                <li className="has-submenu parent-menu-item"><Link to="#"> Blog </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link to="/blog" className="sub-menu-item"> Blogs</Link></li>
                                        <li><Link to="/blog-detail" className="sub-menu-item"> Blog Detail</Link></li>
                                    </ul> 
                                </li>
                        
                                <li><Link to="/helpcenter" className="sub-menu-item">Helpcenter</Link></li>

                                <li className="has-submenu parent-menu-item"><Link to="#"> Auth Pages </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link to="/login" className="sub-menu-item"> Login</Link></li>
                                        <li><Link to="/signup" className="sub-menu-item"> Signup</Link></li>
                                        <li><Link to="/reset-password" className="sub-menu-item"> Forgot Password</Link></li>
                                    </ul> 
                                </li>
                                <li className="has-submenu parent-menu-item"><Link to="#"> Utility </Link><span className="submenu-arrow"></span>
                                    <ul className="submenu">
                                        <li><Link to="/terms" className="sub-menu-item">Terms of Services</Link></li>
                                        <li><Link to="/privacy" className="sub-menu-item">Privacy Policy</Link></li>
                                    </ul>  
                                </li>
                        
                                <li><Link to="/error" className="sub-menu-item"> 404!</Link></li>
                            </ul>
                        </li>
                
                        <li><Link to="/contact" className="sub-menu-item">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}