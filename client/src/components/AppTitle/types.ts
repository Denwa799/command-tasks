import React from 'react';

export interface IAppTitle {
  children: React.ReactNode;
  style?: Object;
  level?: '1' | '2' | '3' | '4';
}
