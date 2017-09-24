/*jslint plusplus: true, devel: true, eqeq: true */
window.onload = function () {
    'use strict';
    var message = [
        {
            error: 'is not a function',
            message: 'вызов приватного метода.'
        }
    ];
    function getRadioValue(radioboxGroupName) {
        var group = document.getElementsByName(radioboxGroupName),
            x;
        for (x = 0; x < group.length; x++) {
            if (group[x].checked) {
                return group[x].value;
            }
        }
        return false;
    }
    function collectionToArray(collection) {
        'use strict';
        return Array.prototype.slice.call(collection);
    }
    Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    return (idx != -1) ? this.splice(idx, 1) : false;
}
    function Hamburger(size, stuffing) {
        this.SIZE_SMALL = [50, 20];
        this.SIZE_LARGE = [100, 40];
        this.STUFFING_CHEESE = [10, 20];
        this.STUFFING_SALAD = [20, 5];
        this.STUFFING_POTATO = [15, 10];
        this.TOPPING_MAYO = [20, 5];
        this.TOPPING_SPICE = [15, 0];
        this.size = size;
        this.stuffing = stuffing;
        this.topping = [];
        this.message = {};
        return {
            addTopping: Hamburger.prototype.addTopping.bind(this),
            removeTopping: Hamburger.prototype.removeTopping.bind(this),
            calculatePrice: Hamburger.prototype.calculatePrice.bind(this),
            calculateCalories: Hamburger.prototype.calculateCalories.bind(this),
        };
    }
    // Функция исключения
    function hamburgerException(err) {
        var resultTag = document.getElementsByClassName('result')[0],
            errText = err.toString();
        message.some(function (mess) {
            if (err.toString().indexOf(mess.error) !== -1) {
                errText = mess.message;
                return true;
            }
        });
        resultTag.innerHTML = 'Ошибка js: ' + errText;
    }
    try {
        Hamburger.prototype.addTopping = function (topping) {
            if (this.topping.indexOf(topping) == -1) {
                this.topping.push(topping);
            }
        };
        Hamburger.prototype.removeTopping = function (topping) {
            this.topping.remove(topping);
        };
        /* Получить список добавок.
         * @return {Array} Массив добавленных добавок, содержит константы
         *                 Hamburger.TOPPING_* */
        Hamburger.prototype.getToppings = function () {
            var that = this;
            return this.topping.map(function (top) {
                return that["TOPPING_" + top.toUpperCase()];
            });
        };
        // Узнать размер гамбургера
        Hamburger.prototype.getSize = function () {
            return this["SIZE_" + this.size.toUpperCase()];
        };
        // Узнать начинку гамбургера
        Hamburger.prototype.getStuffing = function () {
            return this["STUFFING_" + this.stuffing.toUpperCase()];
        };
        /* Узнать цену гамбургера
         * @return {Number} Цена в тугриках */
        Hamburger.prototype.calculatePrice = function () {
            
            console.log(this.getToppings());
            
            return this.getToppings().reduce(function (result, top) {
                return result + top[0];
            }, this.getSize()[0] + this.getStuffing()[0]);
        };
        /* Узнать калорийность
         * @return {Number} Калорийность в калориях */
        Hamburger.prototype.calculateCalories = function () {
            return this.getToppings().reduce(function (result, top) {
                return result + top[1];
            }, this.getSize()[1] + this.getStuffing()[1]);
        };
        /**
         * Представляет информацию об ошибке в ходе работы с гамбургером. 
         * Подробности хранятся в свойстве message.
         * @constructor 
         */
    } catch (err) {
        hamburgerException(err);
    }
        document.getElementsByClassName('calculate')[0].onclick = function () {
            try {
                var burger = new Hamburger(getRadioValue('burgerSize'), getRadioValue('burgerStuffing'));
                collectionToArray(document.getElementsByClassName('burgerTopping')).forEach(function (topVar) {
                    if (topVar.checked) {
                        burger.addTopping(topVar.value);
                    }
                });
                document.getElementsByClassName('result')[0].innerHTML = 'Гамбургер стоит ' + burger.calculatePrice() + ' рублей и содержит ' + burger.calculateCalories() + ' калорий.';
            } catch (err) {
                hamburgerException(err);
            }
        };
};