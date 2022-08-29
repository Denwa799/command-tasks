import React, {FC} from 'react';
import {AuthProvider} from './AuthProvider';
import {InvitationsProvider} from './InvitationsProvider';
import {ProjectsProvider} from './ProjectsProvider';
import {TasksProvider} from './TasksProvider';
import {TeamsProvider} from './TeamsProvider';
import {IProviderComposer, IProviders} from './types';
import {UsersProvider} from './UsersProvider';

const provider = (item: any, props = {}) => [item, props];

const ProviderComposer: FC<IProviderComposer> = ({providers, children}) => {
  for (let i = providers.length - 1; i >= 0; --i) {
    const [Provider, props] = providers[i];
    children = <Provider {...props}>{children}</Provider>;
  }
  return children;
};

export const Providers: FC<IProviders> = ({children}) => {
  return (
    <ProviderComposer
      providers={[
        provider(AuthProvider),
        provider(UsersProvider),
        provider(TeamsProvider),
        provider(ProjectsProvider),
        provider(TasksProvider),
        provider(InvitationsProvider),
      ]}>
      {children}
    </ProviderComposer>
  );
};
