!function(e){var t={};function r(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)r.d(n,a,function(t){return e[t]}.bind(null,a));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=1)}([,function(e,t,r){"use strict";r.r(t);var n=class{constructor(e){this.genericErrorText=e,this.wrapper=document.querySelector(".woocommerce-notices-wrapper"),this.messagesList=document.querySelector("ul.woocommerce-error")}genericError(){this.wrapper.classList.contains("ppcp-persist")||(this.clear(),this.message(this.genericErrorText))}appendPreparedErrorMessageElement(e){null===this.messagesList&&this.prepareMessagesList(),this.messagesList.replaceWith(e)}message(e,t=!1){if(0===e.length)throw new Error("A new message text must be a non-empty string.");null===this.messagesList&&this.prepareMessagesList(),t?this.wrapper.classList.add("ppcp-persist"):this.wrapper.classList.remove("ppcp-persist");let r=this.prepareMessagesListItem(e);this.messagesList.appendChild(r),jQuery.scroll_to_notices(jQuery(".woocommerce-notices-wrapper"))}prepareMessagesList(){null===this.messagesList&&(this.messagesList=document.createElement("ul"),this.messagesList.setAttribute("class","woocommerce-error"),this.messagesList.setAttribute("role","alert"),this.wrapper.appendChild(this.messagesList))}prepareMessagesListItem(e){const t=document.createElement("li");return t.innerHTML=e,t}sanitize(e){const t=document.createElement("textarea");return t.innerHTML=e,t.value.replace("Error: ","")}clear(){this.wrapper.classList.contains("woocommerce-error")&&(this.wrapper.classList.remove("woocommerce-error"),this.wrapper.innerText="")}};var a=(e,t)=>(r,n)=>fetch(e.config.ajax.approve_order.endpoint,{method:"POST",body:JSON.stringify({nonce:e.config.ajax.approve_order.nonce,order_id:r.orderID})}).then(e=>e.json()).then(r=>{if(!r.success)return t.genericError(),n.restart().catch(e=>{t.genericError()});location.href=e.config.redirect});const s=()=>{const e=PayPalCommerceGateway.payer;if(!e)return null;const t=document.querySelector("#billing_phone")||void 0!==e.phone?{phone_type:"HOME",phone_number:{national_number:document.querySelector("#billing_phone")?document.querySelector("#billing_phone").value:e.phone.phone_number.national_number}}:null,r={email_address:document.querySelector("#billing_email")?document.querySelector("#billing_email").value:e.email_address,name:{surname:document.querySelector("#billing_last_name")?document.querySelector("#billing_last_name").value:e.name.surname,given_name:document.querySelector("#billing_first_name")?document.querySelector("#billing_first_name").value:e.name.given_name},address:{country_code:document.querySelector("#billing_country")?document.querySelector("#billing_country").value:e.address.country_code,address_line_1:document.querySelector("#billing_address_1")?document.querySelector("#billing_address_1").value:e.address.address_line_1,address_line_2:document.querySelector("#billing_address_2")?document.querySelector("#billing_address_2").value:e.address.address_line_2,admin_area_1:document.querySelector("#billing_state")?document.querySelector("#billing_state").value:e.address.admin_area_1,admin_area_2:document.querySelector("#billing_city")?document.querySelector("#billing_city").value:e.address.admin_area_2,postal_code:document.querySelector("#billing_postcode")?document.querySelector("#billing_postcode").value:e.address.postal_code}};return t&&(r.phone=t),r};var o=class{constructor(e,t){this.config=e,this.errorHandler=t}configuration(){return{createOrder:(e,t)=>{const r=s(),n=void 0!==this.config.bn_codes[this.config.context]?this.config.bn_codes[this.config.context]:"";return fetch(this.config.ajax.create_order.endpoint,{method:"POST",body:JSON.stringify({nonce:this.config.ajax.create_order.nonce,purchase_units:[],bn_code:n,payer:r,context:this.config.context})}).then((function(e){return e.json()})).then((function(e){if(!e.success)throw console.error(e),Error(e.data.message);return e.data.id}))},onApprove:a(this,this.errorHandler),onError:e=>{this.errorHandler.genericError()}}}};var i=class{constructor(e,t){this.gateway=e,this.renderer=t,this.actionHandler=null}init(){this.actionHandler=new o(PayPalCommerceGateway,new n(this.gateway.labels.error.generic)),this.render(),jQuery(document.body).on("wc_fragments_loaded wc_fragments_refreshed",()=>{this.render()})}shouldRender(){return null!==document.querySelector(this.gateway.button.mini_cart_wrapper)||null!==document.querySelector(this.gateway.hosted_fields.mini_cart_wrapper)}render(){this.shouldRender()&&this.renderer.render(this.gateway.button.mini_cart_wrapper,this.gateway.hosted_fields.mini_cart_wrapper,this.actionHandler.configuration())}};var c=class{constructor(e,t,r){this.id=e,this.quantity=t,this.variations=r}data(){return{id:this.id,quantity:this.quantity,variations:this.variations}}};var d=class{constructor(e,t){this.endpoint=e,this.nonce=t}update(e,t){return new Promise((r,n)=>{fetch(this.endpoint,{method:"POST",body:JSON.stringify({nonce:this.nonce,products:t})}).then(e=>e.json()).then(t=>{if(!t.success)return void n(t.data);const a=e(t.data);r(a)})})}};var u=class{constructor(e,t,r){this.element=e,this.showCallback=t,this.hideCallback=r,this.observer=null}init(){const e=()=>{this.element.classList.contains("disabled")?this.hideCallback():this.showCallback()};this.observer=new MutationObserver(e),this.observer.observe(this.element,{attributes:!0}),e()}disconnect(){this.observer.disconnect()}};var l=class{constructor(e,t,r,n,a,s){this.config=e,this.updateCart=t,this.showButtonCallback=r,this.hideButtonCallback=n,this.formElement=a,this.errorHandler=s}configuration(){if(this.hasVariations()){new u(this.formElement.querySelector(".single_add_to_cart_button"),this.showButtonCallback,this.hideButtonCallback).init()}return{createOrder:this.createOrder(),onApprove:a(this,this.errorHandler),onError:e=>{this.errorHandler.genericError()}}}createOrder(){var e=null;e=this.isGroupedProduct()?()=>{const e=[];return this.formElement.querySelectorAll('input[type="number"]').forEach(t=>{if(!t.value)return;const r=t.getAttribute("name").match(/quantity\[([\d]*)\]/);if(2!==r.length)return;const n=parseInt(r[1]),a=parseInt(t.value);e.push(new c(n,a,null))}),e}:()=>{const e=document.querySelector('[name="add-to-cart"]').value,t=document.querySelector('[name="quantity"]').value,r=this.variations();return[new c(e,t,r)]};return(t,r)=>{this.errorHandler.clear();return this.updateCart.update(e=>{const t=s(),r=void 0!==this.config.bn_codes[this.config.context]?this.config.bn_codes[this.config.context]:"";return fetch(this.config.ajax.create_order.endpoint,{method:"POST",body:JSON.stringify({nonce:this.config.ajax.create_order.nonce,purchase_units:e,payer:t,bn_code:r,context:this.config.context})}).then((function(e){return e.json()})).then((function(e){if(!e.success)throw console.error(e),Error(e.data.message);return e.data.id}))},e())}}variations(){if(!this.hasVariations())return null;return[...this.formElement.querySelectorAll("[name^='attribute_']")].map(e=>({value:e.value,name:e.name}))}hasVariations(){return this.formElement.classList.contains("variations_form")}isGroupedProduct(){return this.formElement.classList.contains("grouped_form")}};var h=class{constructor(e,t,r){this.gateway=e,this.renderer=t,this.messages=r}init(){this.shouldRender()?this.render():this.renderer.hideButtons(this.gateway.hosted_fields.wrapper)}shouldRender(){return null!==document.querySelector("form.cart")}render(){const e=new l(this.gateway,new d(this.gateway.ajax.change_cart.endpoint,this.gateway.ajax.change_cart.nonce),()=>{this.renderer.showButtons(this.gateway.button.wrapper),this.renderer.showButtons(this.gateway.hosted_fields.wrapper);let e="0";document.querySelector("form.cart ins .woocommerce-Price-amount")?e=document.querySelector("form.cart ins .woocommerce-Price-amount").innerText:document.querySelector("form.cart .woocommerce-Price-amount")&&(e=document.querySelector("form.cart .woocommerce-Price-amount").innerText);const t=parseInt(e.replace(/([^\d,\.\s]*)/g,""));this.messages.renderWithAmount(t)},()=>{this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.hosted_fields.wrapper)},document.querySelector("form.cart"),new n(this.gateway.labels.error.generic));this.renderer.render(this.gateway.button.wrapper,this.gateway.hosted_fields.wrapper,e.configuration())}};var p=class{constructor(e,t){this.gateway=e,this.renderer=t}init(){this.shouldRender()&&(this.render(),jQuery(document.body).on("updated_cart_totals updated_checkout",()=>{this.render()}))}shouldRender(){return null!==document.querySelector(this.gateway.button.wrapper)||null!==document.querySelector(this.gateway.hosted_fields.wrapper)}render(){const e=new o(PayPalCommerceGateway,new n(this.gateway.labels.error.generic));this.renderer.render(this.gateway.button.wrapper,this.gateway.hosted_fields.wrapper,e.configuration())}};var m=(e,t,r)=>(n,a)=>(r.block(),fetch(e.config.ajax.approve_order.endpoint,{method:"POST",body:JSON.stringify({nonce:e.config.ajax.approve_order.nonce,order_id:n.orderID})}).then(e=>e.json()).then(e=>{if(r.unblock(),!e.success){if(100===e.data.code?t.message(e.data.message):t.genericError(),void 0!==a&&void 0!==a.restart)return a.restart();throw new Error(e.data.message)}document.querySelector("#place_order").click()}));var y=class{constructor(e,t,r){this.config=e,this.errorHandler=t,this.spinner=r}configuration(){const e=this.spinner;return{createOrder:(t,r)=>{const n=s(),a=void 0!==this.config.bn_codes[this.config.context]?this.config.bn_codes[this.config.context]:"",o=this.errorHandler,i="checkout"===this.config.context?"form.checkout":"form#order_review",c=jQuery(i).serialize();return fetch(this.config.ajax.create_order.endpoint,{method:"POST",body:JSON.stringify({nonce:this.config.ajax.create_order.nonce,payer:n,bn_code:a,context:this.config.context,order_id:this.config.order_id,form:c})}).then((function(e){return e.json()})).then((function(t){if(!t.success){if(e.unblock(),void 0!==t.messages){const e=new DOMParser;o.appendPreparedErrorMessageElement(e.parseFromString(t.messages,"text/html").querySelector("ul"))}else o.message(t.data.message,!0);return}const r=document.createElement("input");return r.setAttribute("type","hidden"),r.setAttribute("name","ppcp-resume-order"),r.setAttribute("value",t.data.purchase_units[0].custom_id),document.querySelector(i).append(r),t.data.id}))},onApprove:m(this,this.errorHandler,this.spinner),onCancel:()=>{e.unblock()},onError:()=>{this.errorHandler.genericError(),e.unblock()}}}};var g=class{constructor(e,t,r,n){this.gateway=e,this.renderer=t,this.messages=r,this.spinner=n}init(){this.render(),jQuery(document.body).on("updated_checkout",()=>{this.render()}),jQuery(document.body).on("updated_checkout payment_method_selected",()=>{this.switchBetweenPayPalandOrderButton(),this.displayPlaceOrderButtonForSavedCreditCards()}),jQuery("#saved-credit-card").on("change",()=>{this.displayPlaceOrderButtonForSavedCreditCards()}),this.switchBetweenPayPalandOrderButton(),this.displayPlaceOrderButtonForSavedCreditCards()}shouldRender(){return!document.querySelector(this.gateway.button.cancel_wrapper)&&(null!==document.querySelector(this.gateway.button.wrapper)||null!==document.querySelector(this.gateway.hosted_fields.wrapper))}render(){if(!this.shouldRender())return;document.querySelector(this.gateway.hosted_fields.wrapper+">div")&&document.querySelector(this.gateway.hosted_fields.wrapper+">div").setAttribute("style","");const e=new y(PayPalCommerceGateway,new n(this.gateway.labels.error.generic),this.spinner);this.renderer.render(this.gateway.button.wrapper,this.gateway.hosted_fields.wrapper,e.configuration())}switchBetweenPayPalandOrderButton(){jQuery("#saved-credit-card").val(jQuery("#saved-credit-card option:first").val());const e=jQuery('input[name="payment_method"]:checked').val();"ppcp-gateway"!==e&&"ppcp-credit-card-gateway"!==e?(this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.messages.wrapper),this.renderer.hideButtons(this.gateway.hosted_fields.wrapper),jQuery("#place_order").show()):(jQuery("#place_order").hide(),"ppcp-gateway"===e&&(this.renderer.showButtons(this.gateway.button.wrapper),this.renderer.showButtons(this.gateway.messages.wrapper),this.messages.render(),this.renderer.hideButtons(this.gateway.hosted_fields.wrapper)),"ppcp-credit-card-gateway"===e&&(this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.messages.wrapper),this.renderer.showButtons(this.gateway.hosted_fields.wrapper)))}displayPlaceOrderButtonForSavedCreditCards(){"ppcp-credit-card-gateway"===jQuery('input[name="payment_method"]:checked').val()&&(jQuery("#saved-credit-card").length&&""!==jQuery("#saved-credit-card").val()?(this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.messages.wrapper),this.renderer.hideButtons(this.gateway.hosted_fields.wrapper),jQuery("#place_order").show()):(jQuery("#place_order").hide(),this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.messages.wrapper),this.renderer.showButtons(this.gateway.hosted_fields.wrapper)))}};var w=class{constructor(e,t,r,n){this.gateway=e,this.renderer=t,this.messages=r,this.spinner=n}init(){this.render(),jQuery(document.body).on("updated_checkout",()=>{this.render()}),jQuery(document.body).on("updated_checkout payment_method_selected",()=>{this.switchBetweenPayPalandOrderButton()}),this.switchBetweenPayPalandOrderButton()}shouldRender(){return!document.querySelector(this.gateway.button.cancel_wrapper)&&(null!==document.querySelector(this.gateway.button.wrapper)||null!==document.querySelector(this.gateway.hosted_fields.wrapper))}render(){if(!this.shouldRender())return;document.querySelector(this.gateway.hosted_fields.wrapper+">div")&&document.querySelector(this.gateway.hosted_fields.wrapper+">div").setAttribute("style","");const e=new y(PayPalCommerceGateway,new n(this.gateway.labels.error.generic),this.spinner);this.renderer.render(this.gateway.button.wrapper,this.gateway.hosted_fields.wrapper,e.configuration())}switchBetweenPayPalandOrderButton(){if(new URLSearchParams(window.location.search).has("change_payment_method"))return;const e=jQuery('input[name="payment_method"]:checked').val();"ppcp-gateway"!==e&&"ppcp-credit-card-gateway"!==e?(this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.messages.wrapper),this.renderer.hideButtons(this.gateway.hosted_fields.wrapper),jQuery("#place_order").show()):(jQuery("#place_order").hide(),"ppcp-gateway"===e&&(this.renderer.showButtons(this.gateway.button.wrapper),this.renderer.showButtons(this.gateway.messages.wrapper),this.messages.render(),this.renderer.hideButtons(this.gateway.hosted_fields.wrapper)),"ppcp-credit-card-gateway"===e&&(this.renderer.hideButtons(this.gateway.button.wrapper),this.renderer.hideButtons(this.gateway.messages.wrapper),this.renderer.showButtons(this.gateway.hosted_fields.wrapper)))}};var f=class{constructor(e,t){this.defaultConfig=t,this.creditCardRenderer=e}render(e,t,r){this.renderButtons(e,r),this.creditCardRenderer.render(t,r)}renderButtons(e,t){if(!document.querySelector(e)||this.isAlreadyRendered(e)||void 0===paypal.Buttons)return;const r=e===this.defaultConfig.button.wrapper?this.defaultConfig.button.style:this.defaultConfig.button.mini_cart_style;paypal.Buttons({style:r,...t}).render(e)}isAlreadyRendered(e){return document.querySelector(e).hasChildNodes()}hideButtons(e){const t=document.querySelector(e);return!!t&&(t.style.display="none",!0)}showButtons(e){const t=document.querySelector(e);return!!t&&(t.style.display="block",!0)}};var _=e=>{const t=window.getComputedStyle(e),r=document.createElement("span");return r.setAttribute("id",e.id),Object.values(t).forEach(e=>{t[e]&&isNaN(e)&&r.style.setProperty(e,""+t[e])}),r};var b=class{constructor(e,t,r){this.defaultConfig=e,this.errorHandler=t,this.spinner=r,this.cardValid=!1}render(e,t){if("checkout"!==this.defaultConfig.context&&"pay-now"!==this.defaultConfig.context||null===e||null===document.querySelector(e))return;if(void 0===paypal.HostedFields||!paypal.HostedFields.isEligible()){const t=document.querySelector(e);return void t.parentNode.removeChild(t)}const r=document.querySelector(".payment_box.payment_method_ppcp-credit-card-gateway"),n=r.style.display;r.style.display="block";const a=document.querySelector("#ppcp-hide-dcc");a&&a.parentNode.removeChild(a);const s=document.querySelector("#ppcp-credit-card-gateway-card-number"),o=window.getComputedStyle(s);let i={};Object.values(o).forEach(e=>{o[e]&&(i[e]=""+o[e])});const c=_(s);s.parentNode.replaceChild(c,s);const d=document.querySelector("#ppcp-credit-card-gateway-card-expiry"),u=_(d);d.parentNode.replaceChild(u,d);const l=document.querySelector("#ppcp-credit-card-gateway-card-cvc"),h=_(l);l.parentNode.replaceChild(h,l),r.style.display=n;const p=".payment_box payment_method_ppcp-credit-card-gateway";this.defaultConfig.enforce_vault&&document.querySelector(p+" .ppcp-credit-card-vault")&&(document.querySelector(p+" .ppcp-credit-card-vault").checked=!0,document.querySelector(p+" .ppcp-credit-card-vault").setAttribute("disabled",!0)),paypal.HostedFields.render({createOrder:t.createOrder,styles:{input:i},fields:{number:{selector:"#ppcp-credit-card-gateway-card-number",placeholder:this.defaultConfig.hosted_fields.labels.credit_card_number},cvv:{selector:"#ppcp-credit-card-gateway-card-cvc",placeholder:this.defaultConfig.hosted_fields.labels.cvv},expirationDate:{selector:"#ppcp-credit-card-gateway-card-expiry",placeholder:this.defaultConfig.hosted_fields.labels.mm_yy}}}).then(r=>{const n=e=>{this.spinner.block(),e&&e.preventDefault(),this.errorHandler.clear();const n=r.getState();if(Object.keys(n.fields).every((function(e){return n.fields[e].isValid}))&&this.cardValid){const e=!!this.defaultConfig.save_card,n=document.getElementById("ppcp-credit-card-vault")?document.getElementById("ppcp-credit-card-vault").checked:e;r.submit({contingencies:["3D_SECURE"],vault:n}).then(e=>(e.orderID=e.orderId,this.spinner.unblock(),t.onApprove(e))).catch(()=>{this.errorHandler.genericError(),this.spinner.unblock()})}else{this.spinner.unblock();const e=this.cardValid?this.defaultConfig.hosted_fields.labels.fields_not_valid:this.defaultConfig.hosted_fields.labels.card_not_supported;this.errorHandler.message(e)}};r.on("inputSubmitRequest",(function(){n(null)})),r.on("cardTypeChange",e=>{if(!e.cards.length)return void(this.cardValid=!1);const t=this.defaultConfig.hosted_fields.valid_cards;this.cardValid=-1!==t.indexOf(e.cards[0].type)}),document.querySelector(e+" button").addEventListener("click",n)}),document.querySelector("#payment_method_ppcp-credit-card-gateway").addEventListener("click",()=>{document.querySelector("label[for=ppcp-credit-card-gateway-card-number]").click()})}};const v=(e,t)=>{if(!e)return!1;if(e.user!==t)return!1;return!((new Date).getTime()>=1e3*e.expiration)};var S=(e,t)=>{fetch(t.endpoint,{method:"POST",body:JSON.stringify({nonce:t.nonce})}).then(e=>e.json()).then(r=>{var n;v(r,t.user)&&(n=r,sessionStorage.setItem("ppcp-data-client-id",JSON.stringify(n)),e.setAttribute("data-client-token",r.token),document.body.append(e))})};var q=class{constructor(e){this.config=e}render(){this.shouldRender()&&paypal.Messages({amount:this.config.amount,placement:this.config.placement,style:this.config.style}).render(this.config.wrapper)}renderWithAmount(e){if(!this.shouldRender())return;const t=document.createElement("div");t.setAttribute("id",this.config.wrapper.replace("#",""));const r=document.querySelector(this.config.wrapper).nextSibling;document.querySelector(this.config.wrapper).parentElement.removeChild(document.querySelector(this.config.wrapper)),r.parentElement.insertBefore(t,r),paypal.Messages({amount:e,placement:this.config.placement,style:this.config.style}).render(this.config.wrapper)}shouldRender(){return void 0!==paypal.Messages&&void 0!==this.config.wrapper&&!!document.querySelector(this.config.wrapper)}};var P=class{constructor(){this.target="form.woocommerce-checkout"}setTarget(e){this.target=e}block(){jQuery(this.target).block({message:null,overlayCSS:{background:"#fff",opacity:.6}})}unblock(){jQuery(this.target).unblock()}};document.addEventListener("DOMContentLoaded",()=>{const e=document.createElement("script");e.addEventListener("load",e=>{(()=>{const e=new n(PayPalCommerceGateway.labels.error.generic),t=new P,r=new b(PayPalCommerceGateway,e,t),a=new f(r,PayPalCommerceGateway),s=new q(PayPalCommerceGateway.messages),o=PayPalCommerceGateway.context;if("mini-cart"===o||"product"===o){new i(PayPalCommerceGateway,a).init()}if("product"===o){new h(PayPalCommerceGateway,a,s).init()}if("cart"===o){new p(PayPalCommerceGateway,a).init()}if("checkout"===o){new g(PayPalCommerceGateway,a,s,t).init()}if("pay-now"===o){new w(PayPalCommerceGateway,a,s,t).init()}"checkout"!==o&&s.render()})()}),e.setAttribute("src",PayPalCommerceGateway.button.url),Object.entries(PayPalCommerceGateway.script_attributes).forEach(t=>{e.setAttribute(t[0],t[1])}),PayPalCommerceGateway.data_client_id.set_attribute?S(e,PayPalCommerceGateway.data_client_id):document.body.append(e)})}]);
//# sourceMappingURL=button.js.map