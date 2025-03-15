import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  // Tem que mockar todos os campos  componente header
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
