// This is all you.
import gsap from "gsap";
import Alpine from "alpinejs";

window.Alpine = Alpine;

// Setup GSAP timelines
let navMenuTl;
let navBackgroundTl;

navMenuTl = gsap.timeline({ defaults: { duration: 0.3 } });
navBackgroundTl = gsap.timeline({ defaults: { duration: 0.2 } });

navBackgroundTl
  .fromTo("#navBackDrop", { autoAlpha: 0 }, { autoAlpha: 0.4 })
  .to("#navBar", { backdropFilter: "blur(16px)", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }, "<");
navBackgroundTl.pause();

navMenuTl
  .to("#upper", { y: 4, width: 18, rotateZ: 45, duration: 0.2 })
  .to("#lower", { y: -4, width: 18, rotateZ: -45, duration: 0.2 }, "<")
  .from("#fox", { x: 980, autoAlpha: 0, duration: 0.5 }, "<")
  .from("#letterR", { x: -265 }, "<")
  .from("#letter", { autoAlpha: 0, y: 10, stagger: 0.05, duration: 0.4 }, "<")
  .from("#dot", { x: -480, duration: 0.5, ease: "power2.out" }, "<")
  .to("#navBar", { backgroundColor: "#FFF", duration: 0.01 }, "<")
  .fromTo("#navBar", { height: 72 }, { height: 350, ease: "power2.inOut", duration: 0.3 }, "<")
  .fromTo("#navLinkContainer", { autoAlpha: 0, duration: 0.2, height: 0 }, { autoAlpha: 1 }, "<")
  .from("#backDrop", { autoAlpha: 0, duration: 0.2 }, "<")
  .from("#navItem", { autoAlpha: 0, y: -20, stagger: 0.08, duration: 0.6, ease: "power1.out" }, "<");
navMenuTl.pause();

//Setup alpine navbar handler
document.addEventListener("alpine:init", () => {
  //Alpine store for being able to let faded backdrop close nav menu on click
  Alpine.store("navMenu", {
    show: false,

    toggleMenu() {
      this.show = !this.show;
    },

    hideMenu() {
      this.show = false;
    },

    init() {
      this.scrollPos = window.scrollY;
      Alpine.effect(() => {
        this.show ? navMenuTl.restart() : navMenuTl.reverse();
      });
    },
  });

  //Data on nav component to detect scroll position and handle bg blur
  Alpine.data("navBg", () => ({
    scrollPos: null,
    atTop: null,

    init() {
      this.scrollPos = window.scrollY;

      this.$watch("scrollPos", (newValue, oldValue) => {
        if (newValue < 50) {
          this.atTop = true;
        } else if (newValue > 50) {
          this.atTop = false;
        }
      });
      this.$watch("atTop", (newValue, oldValue) => {
        if (newValue) {
          this.hideNavBackGround();
        } else {
          this.showNavBackGround();
        }
      });
    },

    showNavBackGround() {
      navBackgroundTl.restart();
    },

    hideNavBackGround() {
      navBackgroundTl.reverse();
    },
  }));
});

Alpine.start();
