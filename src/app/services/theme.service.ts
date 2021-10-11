import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Theme } from "./enums";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    public currentTheme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>(Theme.Light);

    public toggleTheme(): void {
        if(this.currentTheme$.getValue() === Theme.Light) {
            this.currentTheme$.next(Theme.Dark);
        } else {
            this.currentTheme$.next(Theme.Light);
        }
        this.addClassToBody(this.currentTheme$.getValue());
    }

    public init(): void {
        this.addClassToBody(this.currentTheme$.getValue());
    }

    private addClassToBody(theme: Theme): void {
        const bodyTag = document.body;
        const classToBeRemoved = theme === Theme.Light ? Theme.Dark : Theme.Light;
        bodyTag.classList.remove(classToBeRemoved);
        bodyTag.classList.add(theme);
    }
}