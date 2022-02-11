import { animate, query, style, group, trigger, transition, keyframes, AnimationTransitionMetadata } from "@angular/animations";
import { AnimationDirection } from "./animation-direction.enum";     

  export const fadeAnimation = trigger('fade', [
    transition(':increment, :decrement', [
      animate('2s cubic-bezier(0,1,1,1)', keyframes([
        style({ 
          transform: 'scale(0) translateY(100px)',
          offset: 0.4
         }),
        style({ 
          transform: 'translateY(100px) scale(0)',
          animationTimingFunction: 'cubic-bezier(.16,3,1,1.05)',
          offset: 0.9
        }),
        style({ 
          transform: 'translateY(0) scale(1)',
          offset: 1
        })
      ])),
    ])
  ]);

  function createSlideAnimation(pageFrom: string, pageTo: string, direction: AnimationDirection): AnimationTransitionMetadata {
    return transition(`${pageFrom} => ${pageTo}`, [
          style({ position: 'relative' }),
          query(':enter, :leave', [
            style({
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%'
            }),
          ]),
          query(':enter', [
            style({ left: `${direction === AnimationDirection.Left ? '-' : ''}100%` })
          ]),
          group([
            query(':leave', [
              animate('2s cubic-bezier(.75,0,.25,1)', style({ left: `${direction === AnimationDirection.Left ? '' : '-'}100%` }))
            ]),
            query(':enter', [
              animate('2s cubic-bezier(.75,0,.25,1)', style({ left: '0%' }))
            ]),
            query(':enter, :leave', [
                animate('2s', keyframes([
                    style({ 
                      transform: 'scale(0.8)',
                      'border-radius': '20px',
                      'box-shadow': '0 0 70px -30px black',
                      'animation-timing-function': 'cubic-bezier(1,0,1,1)',
                      offset: 0.5
                     }),
                     style({ 
                      transform: 'scale(1)',
                      'border-radius': 0,
                      offset: 1
                     }),
                  ]))
            ])
          ]),          
        ]);
  }

export const pagesAnimations = trigger('routeAnimations', [
    createSlideAnimation('HomePage', 'TodoPage', AnimationDirection.Right),
    createSlideAnimation('TodoPage', 'HomePage', AnimationDirection.Left),
    createSlideAnimation('TodoPage', 'GamePage', AnimationDirection.Right),
    createSlideAnimation('GamePage', 'TodoPage', AnimationDirection.Left),
    createSlideAnimation('GamePage', 'AnimationsPage', AnimationDirection.Right),
    createSlideAnimation('AnimationsPage', 'GamePage', AnimationDirection.Left)
]);