import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  public input: string = '';
  public result: string = '';

  append(value: string) {
    this.input += value;
  }

  clear() {
    this.input = '';
    this.result = '';
  }

  calculate() {
    try {
      this.result = eval(this.input).toString();
    } catch (e) {
      this.result = 'Erreur';
    }
  }
  
}
