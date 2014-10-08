/*

    Copyright (C) 2012-2013 by Clearcode <http://clearcode.cc>
    and associates (see AUTHORS).

    This file is part of cc-popoverTemplate-directive.

    cc-popoverTemplate-directive is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    cc-popoverTemplate-directive is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with cc-popoverTemplate-directive.  If not, see <http://www.gnu.org/licenses/>.

*/
'use strict';

angular.module('cc.popoverTemplate.directive')
    .directive('popoverTemplate', ['utils', '$compile', '$document', '$controller',
        function (utils, $compile, $document, $controller) {

        var templateDom;

        return {
            restrict: 'A',
            scope: true,
            link: function postLink($scope, element, attr) {

                utils.getTemplate(attr.popoverTemplate, function(content){

                    $scope.togglePopover = function(){
                        if(!element.hasClass('arrow-active')){
                            $scope.$broadcast('popover-opened');
                            $scope.$emit('popover-opened');
                        }
                        element.toggleClass('arrow-active');
                        element.popover('toggle');
                    }

                    $scope.closePopover = function(){
                        if(element.hasClass('arrow-active')){
                            element.removeClass('arrow-active');
                            element.popover('toggle');
                        }
                    }

                    var documentClosePopover = function(e){
                        if(element[0] !== e.target &&
                            !element[0].contains(e.target) &&
                            !$(e.target).parents('.popover').length){

                            $scope.closePopover();
                        }
                    };

                    if(attr.popoverCtrl){
                        $controller(attr.popoverCtrl, {
                            $scope: $scope
                        });
                    }

                    var popoverConfig = {
                        html: true,
                        animation: false,
                        placement: 'bottom',
                        trigger: 'manual',
                        content: function(){
                            return $scope.$apply(function(){
                                if(templateDom){
                                    templateDom.remove();
                                }
                                templateDom = $compile(content)($scope);
                                return templateDom;
                            });
                        }
                    };

                    if(attr.popoverContainer){
                        popoverConfig['container'] = attr.popoverContainer;
                    }

                    element.popover(popoverConfig);

                    $document.on('click', documentClosePopover);
                    element.on('click', $scope.togglePopover);

                    $scope.$on('$destroy', function(){
                        $document.off('click', documentClosePopover);
                        element.off('click', $scope.togglePopover);
                        templateDom && templateDom.remove();
                    });
                });
            }
        };
    }]);
