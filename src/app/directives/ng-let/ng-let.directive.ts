import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

interface ILetContext<T> {
  ngLet: T;
}

@Directive({
    selector: '[ngLet]'
})
export class NgLetDirective<T> {
    public context: ILetContext<T | null> = { ngLet: null };

    constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<ILetContext<T>>) {
        viewContainer.createEmbeddedView(templateRef, this.context);
    }

    @Input()
    public set ngLet(value: T) {
        this.context.ngLet = value;
    }
}