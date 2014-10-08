/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-selectpicker-directive.

    cc-selectpicker-directive is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-selectpicker-directive is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-selectpicker-directive.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';

describe('Directive: popoverTemplate', function () {

    // load the directive's module
    beforeEach(module('sandboxApp'));

    var $scope, dom, $httpBackend, $controller;

    function TestCtrl($scope){
        $scope.t1 = 't1';
    }

    beforeEach(function(){
        module(function($provide){
            $provide.value('$controller', jasmine.createSpy('$controller'));
        });
    });

    beforeEach(inject(function ($rootScope, $compile, _$httpBackend_, _$controller_) {
        $scope = $rootScope.$new();
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $controller.andCallFake(function(ctrlName, obj){
            new TestCtrl(obj.$scope);
        });
        $httpBackend.expectGET('views/template.html').respond('<div class="testtmpl">Test templ {{ t1 }}</div>');
        dom = $compile('<div><a popover-template="views/template.html" popover-ctrl="TestCtrl">Test</a></div>')($scope);
        $httpBackend.flush();
        $scope.$digest();
    }));

    it('should create proper controller', function(){
    	console.log($controller.mostRecentCall.args[1]);
        expect($controller.mostRecentCall.args[0]).toEqual('TestCtrl');
        expect($controller.mostRecentCall.args[1]).toEqual(jasmine.any(Object));
    });

    describe('on first click on link', function(){
        beforeEach(function(){
            dom.find('a').click();
        });

        it('should show popover with given template', function(){
            expect(dom.find('.popover .testtmpl').length).toEqual(1);
        });

        it('should render popover template by data given from controller', function(){
            expect(dom.find('.popover .testtmpl').text()).toEqual('Test templ t1');
        });

        describe('on second click on link', function(){
            beforeEach(function(){
                dom.find('a').click();
            });

            it('should remove popover', function(){
                expect(dom.find('.popover .testtmpl').length).toEqual(0);
            });
        });

        describe('on click on document', function(){
            beforeEach(function(){
                $(document).click();
            });

            it('should remove popover', function(){
                expect(dom.find('.popover .testtmpl').length).toEqual(0);
            });
        });
    });
});
