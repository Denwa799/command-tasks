import React from 'react';

export interface IAppTitle {
  children: React.ReactNode;
  level?: '1' | '2' | '3' | '4';
  style?: Object;
}
