import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoDark from '../assets/images/logo-dark.png'
import logoLight from '../assets/images/logo-light.png'
import { getToken } from '../services/LocalStorageServices';
import { FaShoppingCart } from 'react-icons/fa';

export default function Navbar() {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [scroll, setScroll] = useState(false);
  
    useEffect(() => {
      activateMenu();
      window.addEventListener("scroll", () => {
        setScroll(window.scrollY > 50);
      });
    }, []);

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
  // Obtener el token de acceso desde el almacenamiento local
  const { access_token } = getToken();

    return(
        <>
        <nav id="topnav" className={`${scroll ? "nav-sticky" : "" } defaultscroll is-sticky`}>
            <div className="container">
                <Link className="logo" to="/">
                    <img src={logoDark} className="h-6 inline-block dark:hidden" alt=""/>
                    <img src={logoLight} className="h-6 hidden dark:inline-block" alt=""/>
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
                {access_token ? (
            // Si hay un token de acceso, el usuario está autenticado
            <ul className="buy-button list-none mb-0">
            <li className="inline mb-0">
                <Link to="/cart"> {/* Nueva ruta para el carrito */}
                    <FaShoppingCart className="inline-block mr-2" />
                    <span>&nbsp;</span>
                </Link>
                    </li>
                    <li className="inline mb-0">
                        <Link to="/dashboard">
                            <span>&nbsp;</span>
                            <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Mi Cuenta</span>
                        </Link>
                    </li>
                </ul>
                    ) : (
                        <ul className="buy-button list-none mb-0">
                            <li className="inline mb-0">
                            <Link to="/login">
                                <FaShoppingCart className="inline-block mr-2" />
                                <span>&nbsp;</span> {/* Agrega un espacio en blanco */}
                                <span className="py-[6px] px-4 md:inline hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400/5 hover:bg-amber-400 border border-amber-400/10 hover:border-amber-400 text-amber-400 hover:text-white font-semibold">Iniciar Sesión</span>
                                <span className="py-[6px] px-4 inline md:hidden items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Login</span>
                            </Link>
                            </li>

                            <li className="md:inline hidden ps-1 mb-0 ">
                                <Link to="/signup" target="_blank" className="py-[6px] px-4 inline-block items-center justify-center tracking-wider align-middle duration-500 text-sm text-center rounded bg-amber-400 hover:bg-amber-500 border border-amber-400 hover:border-amber-500 text-white font-semibold">Registrarme</Link>
                            </li>
                        </ul>
                    )}
                <div id="navigation" className={`${toggleMenu ? 'block' : ''}`}>
                    <ul className="navigation-menu">

                        <li><Link to="/" className="sub-menu-item">Inicio</Link></li>

                        <li><Link to="/aboutus" className="sub-menu-item">Sobre Nosotros</Link></li>
                        <li><Link to="/pricing" className="sub-menu-item">Productos </Link></li>
                
                        <li><Link to="/services" className="sub-menu-item">Cabinas</Link></li>
                
                        <li><Link to="/contact" className="sub-menu-item">Contacto</Link></li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}