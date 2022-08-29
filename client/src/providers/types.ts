import React from 'react';

export interface IProviders {
  children: React.ReactElement;
}

export interface IProviderComposer {
  providers: any[];
  children: React.ReactElement;
}
