import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { setTheme } from '@ui5/webcomponents-base/dist/config/Theme.js';
import { AccountService } from '../_services/account.service';
import { NavigationService } from '../_services/navigation.service';
import { MessageService } from '../_services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() selectionChange: any;
  @ViewChild('themeSettingsPopover') themeSettingsPopover: ElementRef;
  @ViewChild('profileSettingsPopover') profileSettingsPopover: ElementRef;
  @ViewChild('dialogChangePassword') oDialogChangePassword: ElementRef;
  //const settingsPopover = document.getElementById("theme-settings-popover");

  swchChPsw = false;

  constructor(
    public accountService: AccountService,
    private navService: NavigationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    // Initialization logic
  }

  ngAfterViewInit(): void {
    if (!this.accountService.isLoged()) {
      this.navService.goToLogin();
    }
  }

  handleGoHome(): void {
    this.navService.goHome();
  }

  handleThemeSettingsToggle(event: any): void {
	this.themeSettingsPopover.nativeElement.opener = event.detail.targetRef;
	this.themeSettingsPopover.nativeElement.open = true;
  }

  handleThemeChange(event: any): void {
    setTheme(event.detail.selectedItems[0].getAttribute('data-theme'));
    this.themeSettingsPopover.nativeElement.open = false;
  }

  handleProfileClick(event: any): void {
	this.profileSettingsPopover.nativeElement.opener = event.detail.targetRef;
	this.profileSettingsPopover.nativeElement.open = !this.profileSettingsPopover.nativeElement.open;

    //this.profileSettingsPopover.nativeElement.showAt(event.detail.targetRef);
  }

  handleProfileSettingsSelect(event: any): void {
    const selectedKey = event.detail.item.getAttribute('data-key');
    console.log(selectedKey);
    switch (selectedKey) {
      case 'settings':
        //this.profileSettingsPopover.nativeElement.open = false;
		this.profileSettingsPopover.nativeElement.open = false;

        this.navService.goToAdmin();
        break;
      case 'help':
        this.profileSettingsPopover.nativeElement.open = false;
        window['help-dialog'].open = true;
        break;
      case 'password-change':
        this.profileSettingsPopover.nativeElement.open = false;
        this.swchChPsw = true;
        this.oDialogChangePassword.nativeElement.open = true;
        break;
    }
  }

  handleLogOut(): void {
    this.accountService.logout();
    this.navService.goToLogin();
  }

  handleCloseChangePassw(event: any): void {
    const resultMsg = event.resultMsg;
    this.swchChPsw = false;
    console.log(resultMsg);
    resultMsg.forEach((msg: any) => {
      this.messageService.setMessage({ type: msg.type, text: msg.text, number: 101, displayStyle: '' });
    });
    this.oDialogChangePassword.nativeElement.open = false;
  }

  app_goToLogin(): void {
    this.navService.goToLogin();
  }

  handleRtlSwitchChange(event: any): void {
    document.body.dir = event.target.checked ? 'rtl' : 'ltr';
  }

  handleContentDensitySwitchChange(event: any): void {
    if (event.target.checked) {
      document.body.classList.add('ui5-content-density-compact');
    } else {
      document.body.classList.remove('ui5-content-density-compact');
    }
  }

  handleSettingsDialogCloseButtonClick(event: any): void {
    window['settings-dialog'].close();
  }

  handleHelpDialogCloseButtonClick(event: any): void {
    window['help-dialog'].open = false;
  }
}