import BOBasePage from '@pages/BO/BObasePage';

import type WebserviceData from '@data/faker/webservice';

import type {Page} from 'playwright';

/**
 * Add webservice page, contains functions that can be used on the page
 * @class
 * @extends BOBasePage
 */
class AddWebserviceKey extends BOBasePage {
  public readonly pageTitleCreate: string;

  public readonly pageTitleEdit: string;

  private readonly webserviceKeyInput: string;

  private readonly generateButton: string;

  private readonly keyDescriptionTextarea: string;

  private readonly statusToggleInput: (toggle: number) => string;

  private readonly saveButton: string;

  /**
   * @constructs
   * Setting up texts and selectors to use on add webservice page
   */
  constructor() {
    super();

    this.pageTitleCreate = 'Webservice •';
    this.pageTitleEdit = 'Webservice •';

    // Selectors
    this.webserviceKeyInput = '#webservice_key_key';
    this.generateButton = 'button.js-generator-btn';
    this.keyDescriptionTextarea = '#webservice_key_description';
    this.statusToggleInput = (toggle: number) => `#webservice_key_status_${toggle}`;
    this.saveButton = '#save-button';
  }

  /*
  Methods
   */

  /**
   * Fill form for add/edit webservice key
   * @param page {Page} Browser tab
   * @param webserviceData {WebserviceData} Data to set on add/edit webservice form
   * @param toGenerate
   * @returns {Promise<string>}
   */
  async createEditWebservice(page: Page, webserviceData: WebserviceData, toGenerate: boolean = true): Promise<string> {
    if (toGenerate) {
      await page.click(this.generateButton);
    } else {
      await this.setValue(page, this.webserviceKeyInput, webserviceData.key);
    }

    await this.setValue(page, this.keyDescriptionTextarea, webserviceData.keyDescription);
    // id = 1 if active = YES / 0 if active = NO
    await this.setChecked(page, this.statusToggleInput(webserviceData.status ? 1 : 0));

    await this.clickAndWaitForNavigation(page, this.saveButton);

    return this.getAlertSuccessBlockParagraphContent(page);
  }
}

export default new AddWebserviceKey();
