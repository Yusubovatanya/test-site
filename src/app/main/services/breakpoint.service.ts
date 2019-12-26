import { Injectable } from '@angular/core';

export const CustomBreakpointNames = {
  extraSmall: 'extraSmall',
  extraLarge: 'extraLarge'
};

@Injectable({
  providedIn: 'root'
})

export class BreakpointService {
  constructor() {
  }

  breakpoints: object = {
    '(min-width: 768px)': CustomBreakpointNames.extraSmall,
  };

  getBreakpoints(): string[] {
    return Object.keys(this.breakpoints);
  }

  getBreakpointName(breakpointValue): string {
    return this.breakpoints[breakpointValue];
  }
}
