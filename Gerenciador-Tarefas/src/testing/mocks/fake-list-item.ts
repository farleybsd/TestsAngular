import { Component, input, InputSignal } from "@angular/core";
import { ListItemComponent } from "src/app/pages/list/list-item/list-item.component";
import { Task } from "src/app/shared/interfaces/task.interface";

@Component({
selector: 'app-list-item', // tem que ser o mesmo do componente original   
standalone: true,
template: ''
})

export class FakeListItemComponent implements ListItemComponent {
    task: InputSignal<Task> = input.required<Task>();

}