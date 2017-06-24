
/**
 * https://libraryinstitute.wordpress.com/2010/12/01/loading-javascript-modules/#module-pattern
 */


console.log('start modular test');

var core = core || {};

(function () {

    var modules = {}; // private record of module data

    // modules are functions with additional information
    function module(name, imports, mod) {

        // record module information
        console.log('loading module ' + name);
        modules[name] = {name: name, imports: imports, mod: mod};

        // collect import dependencies
        var deps = [];
        for (var i in imports) {
            deps.push(modules[imports[i]].linked);
        }

        // execute module code, pass imports, record exports
        modules[name].linked = mod.apply(null, deps);
    }

    // export module wrapper
    core.module = module;

})()


core.module('module1', [], function () {

    console.log('run module1');

    return {
        mod1Attr: "from mod 1"
    }

});

core.module('module2', ['module1'], function (mod1) {

    console.log('run module2');

    console.log('from mod 2 carrying mod 1: ' + mod1.mod1Attr);

    function play() {

        console.log('module 2 play has started');
    }

    core.testobj = play;

    var private = {
        pri: function () {
            return "from private";
        }
    };

    var public = {};

    public.games = {
        attr1: private.pri(),
        attr2: function () {
            console.log('funcy');
        },
        attr3: function () {
            console.log(mod1.mod1Attr);
        }
    };

    return public;
});

console.log(core);

core.testobj();
