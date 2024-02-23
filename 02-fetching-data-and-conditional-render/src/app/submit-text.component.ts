import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-submit-text',
  standalone: true,
  imports: [],
  template: `
    <div>
      <!-- addTaskInput jest dostępny tylko w templatce (template) -->
      <input
        #addTaskInput
        type="text"
        class="border-b-orange-400 outline-none"
        (keyup.enter)="
          submitText.emit(addTaskInput.value); addTaskInput.value = ''
        "
      />
      <button
        (click)="submitText.emit(addTaskInput.value); addTaskInput.value = ''"
        class="border border-orange-400 ml-4 px-4"
      >
        Add
      </button>
    </div>
  `,
  styles: ``,
})
export class SubmitTextComponent {
  @Output() submitText = new EventEmitter<string>();
}
