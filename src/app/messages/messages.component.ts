import { Component, OnInit } from '@angular/core';
// Srv
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  constructor(public messageSrv: MessagesService) {}

  ngOnInit(): void {}
}
