/**
 * main.js
 * http://www.designtheway.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, DesignTheWay
 * http://www.designtheway.com
 */

$(function() {
    
    var $body = $('body'),
        $menuBar = $('.menu'),
        $menuBarBefore = CSSRulePlugin.getRule(".menu:before"),
        $menuBarAfter = CSSRulePlugin.getRule(".menu:after"),
        $backButton = $('.back'),
        $statusText = $('.status-text'),
        $scan = $('#scan'),
        $scanButton = $('.scan-button a'),
        $infoText = $('.info-text'),
        $slide01 = $('.slide1'),
        $slide02 = $('.slide2'),
        $slide03 = $('.slide3'),
        $slide04 = $('.slide4'),
        $progressContainer = $('.progress-container'),
        $scanText = $('.scanning'),
        $wave = $('.wave'),
        $loader = $('#loader'),
        $blink = $('.blinking-circle'),
        $blinkAfter = CSSRulePlugin.getRule(".blinking-circle:after"),
        $progressMask01 = $('.progress-text.clip'),
        $progressMask02 = $('.progress-text.white.clip'),
        $statusBar = $('.status-bar'),
        $scanText = $('.scanning'),
        $cleanableSize = $('.cleanable-amount'),
        $suggestedItems = $('.suggested-files li'),
        $cleanButton = $('.clean-button a'),
        $finishContainer = $('#finish'),
        $finishButton = $('.finish-button a'),
        $finalText = $('.final-text'),
        $totalCleaned = $('#total-cleaned'),
        initialValue = 0,
        finalValue = 100,
        Cont={val:initialValue},
        NewVal = finalValue,
        ContRev={val:finalValue},
        RevVal = initialValue;
        


    // Reset all slides
    function resetSlides(){
        var resetTl = new TimelineMax();

            resetTl
                .set($body, {className: '+=slide00'})
                .set([$slide01, $infoText], {autoAlpha: 1})
                .set([$scan, $scanButton], {autoAlpha: 1, scale: 1})
                .set($statusBar, {backgroundColor: '#2196f3'})
                .set($statusText, {text: "Mobile Scan"})
                .set(Cont, {val:initialValue, onComplete:function(){
                    document.getElementById("progress-value").innerHTML=Cont.val,
                    document.getElementById("progress-value-2").innerHTML=Cont.val
                }})
                .set(ContRev, {val:finalValue, onComplete:function(){
                    document.getElementById("reverse-value").innerHTML=ContRev.val
                }})
                .set($progressMask01, {clip: "rect(0px 100px 50px 0px)"})
                .set($progressMask02, {clip: "rect(50px 100px 50px 0px)"})
                .set($blink, {autoAlpha: 1})
                .set([$slide02, $progressContainer, $scanText, $finishContainer, $finalText], {autoAlpha: 0})
                .set($slide03, {x: 350, autoAlpha: 0})
                .set($cleanButton, {autoAlpha: 0})
                .fromTo($scan, 0.5, {autoAlpha: 0, scale: 0},{autoAlpha: 1, scale: 1, ease: Power4.easeInOut});

        
        return resetTl;        
    }


    // Scan Intro Slide
    
    var scanIntroTl = new TimelineMax({paused: true});

        scanIntroTl
            .set($body, {className: '-=slide00'})
            .fromTo($menuBar, 0.1, {rotation: 0}, {rotation: 180, transformOrigin: 'center center', ease:Linear.easeNone},'0')
            .to($menuBarBefore, 0.1, {cssRule:{width: '9px', rotation: 35}, ease:Linear.easeNone},'0')
            .to($menuBarAfter, 0.1, {cssRule:{width: '9px', rotation: -35}, ease:Linear.easeNone},'0')
            .set($statusText, {text: "Clean"})
            .to($scanButton, 0.5, {autoAlpha: 0, scale: 0, transformOrigin: 'center center', ease: Power4.easeInOut}, '0')
            .add('scan-btn-out')
            .to($scan, 0.5, {autoAlpha: 0, scale: 0, transformOrigin: 'center center', ease: Power4.easeInOut}, 'scan-btn-out-=0.2')
            .to($infoText, 0.5, {autoAlpha: 0, ease: Power4.easeInOut,
                onComplete:function(){
                    scanTl.play(0);
                }
            }, 'scan-btn-out-=0.3');

               

    

    var colorSwitchTl = new TimelineMax({paused: true});
        
        colorSwitchTl
           .fromTo([$wave, $statusBar], 1, {backgroundColor: '#2196f3'}, {backgroundColor: '#ffa421', ease:Linear.easeNone},'0')
           .fromTo($loader, 1, {stroke: '#2196f3'}, {stroke: '#ffa421', ease:Linear.easeNone},'0')
           .fromTo($blink, 1, {borderColor: '#2196f3'}, {borderColor: '#ffa421', ease:Linear.easeNone},'0')
           .fromTo($blinkAfter, 1, {cssRule:{borderColor: '#2196f3'}}, {cssRule:{borderColor: '#ffa421'}, ease:Linear.easeNone},'0')
           .add('play-from')
           .fromTo($scanText, 1, {color: '#2196f3'}, {color: '#ffa421', ease:Linear.easeNone},'0');



    var scanTl = new TimelineMax({paused: true});

        scanTl
            .set($slide01, {autoAlpha: 0})
            .set($slide02, {autoAlpha: 1})
            .fromTo($progressContainer, 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Power4.easeInOut}, '0')
            .to($scanText, 1, {autoAlpha: 1})
            .set($wave, {backgroundColor: '#2196f3'})
            .add('wave-start')
            .fromTo($wave, 25, {x: 0, y: -20, scale: 1}, {x: -4161, y: -127, scale: 1.5, ease:Linear.easeNone})
            .fromTo($loader, 25, {strokeDasharray: 471, strokeDashoffset: 471}, {strokeDasharray: 471, strokeDashoffset: 0, ease:SlowMo.ease.config( 0.8, 0.4, false)}, 'wave-start')
            .to($blink, 25, {bezier:{curviness:1.55, values:[{x:-75, y:75}, {x:-150, y:0}, {x:-75, y:-75}, {x:0, y:0}]}, ease:SlowMo.ease.config( 0.8, 0.4, false), onComplete:function(){
                TweenMax.set($blink, {autoAlpha: 0});
                suggestionTl.play(0);
            }}, 'wave-start')
            .to(Cont, 25, {val:NewVal, roundProps:"val", onUpdate:function(){
                  document.getElementById("progress-value").innerHTML=Cont.val,
                  document.getElementById("progress-value-2").innerHTML=Cont.val
                },ease:Linear.easeNone}, 'wave-start')
            .to($progressMask01, 8, {clip: "rect(0px 100px 0px 0px)", ease:Linear.easeNone}, 'wave-start+=9.1')
            .to($progressMask02, 8, {clip: "rect(0px 100px 52px 0px)", ease:Linear.easeNone}, 'wave-start+=9.1')
            .add('text-change')
            .add(colorSwitchTl.play(0),'text-change-=6');

        


    
    var suggestionTl = new TimelineMax({paused: true});

        suggestionTl
            .to($slide02, 0.5, {autoAlpha: 0})
            .to($slide03, 0.5, {x: 0, autoAlpha: 1, ease:Power4.easeInOut})
            .set([$statusBar, $cleanableSize, $cleanButton], {backgroundColor: '#ffa421'}, '0')
            .staggerFromTo($suggestedItems, 1.5, {x: 300, autoAlpha: 0}, {x: 0, autoAlpha: 1, ease:Power4.easeInOut}, 0.1, '0')
            .add('list-in')
            .fromTo($cleanButton, 0.5, {autoAlpha: 0, scale: 0},{autoAlpha: 1, scale: 1, ease:Power4.easeInOut}, 'list-in-=0.5');

    


    var suggestionCleanTl = new TimelineMax({paused: true});

        suggestionCleanTl
            .to($cleanButton, 0.5, {autoAlpha:0, scale: 0, ease:Power4.easeInOut})
            .to(ContRev, 2, {val:RevVal, roundProps:"val", onUpdate:function(){
              document.getElementById("reverse-value").innerHTML=ContRev.val
            },ease:Linear.easeNone, onComplete:function(){
                finalTl.play(0);
            }}, '0')
            .add('cleaned')
            .staggerTo($suggestedItems, 1.5, {x: -300, autoAlpha: 0, ease:Power4.easeInOut}, 0.1, 'cleaned-=1')
            .to([$statusBar, $cleanableSize, $cleanButton], 1, {backgroundColor: '#2196f3', ease:Linear.easeNone},'cleaned-=1');

    


    var finalTl = new TimelineMax({paused: true});

        finalTl
           .set($slide04, {autoAlpha: 1})
           .to($slide03, 1, {x: 350, ease:Power4.easeInOut})
           .fromTo($finishContainer, 1, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease:Power4.easeInOut}, '+0.1')
           .to($finalText, 0.5, {autoAlpha: 1, ease:Power4.easeInOut, onStart:function(){
              document.getElementById("total-cleaned").innerHTML=Cont.val  
           }}, '+0.8');




    $scanButton.click(function(e) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        scanIntroTl.play(0);
    })    

    $cleanButton.click(function(e) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        suggestionCleanTl.play(0);
    })

    $finishButton.click(function(e) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        scanIntroTl.pause(0);
        resetSlides();
    })

    $backButton.click(function(e) {
        if(e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        if(!$body.hasClass('slide00')){
            scanIntroTl.pause(0);
            scanTl.pause(0);
            suggestionTl.pause(0);
            suggestionCleanTl.pause(0);
            finalTl.pause(0);
            resetSlides();
        }
    })

    resetSlides();

});
