import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {

  @Input() screen: string;

  constructor() { }

  ngOnInit() {
  }

}
