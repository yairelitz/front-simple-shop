interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleIdentityService {
  initialize(config: {
    client_id: string;
    callback: (response: GoogleCredentialResponse) => void;
  }): void;
  renderButton(parent: HTMLElement, options: {
    theme?: string;
    size?: string;
  }): void;
}

interface Window {
  google: {
    accounts: {
      id: GoogleIdentityService;
    };
  };
}
