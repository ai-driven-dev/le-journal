import { IsNotEmpty, IsString } from 'class-validator';
import { afterEach, describe, expect, it } from 'vitest';

import { verify, verifyFormData } from './validator';

// Classe de test
class TestClass {
  @IsString()
  @IsNotEmpty()
  name!: string;
}

interface TestState {
  name: string;
}

describe('validator', () => {
  describe('verify', () => {
    it('should validate a valid object', () => {
      const testObject = new TestClass();
      testObject.name = 'Test';

      expect(() => verify(testObject)).not.toThrow();
    });

    it('should throw an error for invalid object', () => {
      const testObject = new TestClass();
      testObject.name = '';

      expect(() => verify(testObject)).toThrow();
    });
  });

  describe('verifyFormData', () => {
    const createMockFormEvent = (formData: FormData): React.FormEvent<HTMLFormElement> => {
      const form = document.createElement('form');

      // Mock the FormData constructor to return our test FormData
      const originalFormData = global.FormData;
      global.FormData = class extends originalFormData {
        constructor() {
          super();
          return formData;
        }
      } as unknown as typeof FormData;

      return {
        currentTarget: form,
        preventDefault: () => undefined,
        bubbles: true,
        cancelable: true,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: true,
        nativeEvent: new Event('submit'),
        target: form,
        timeStamp: Date.now(),
        type: 'submit',
        isDefaultPrevented: () => false,
        stopPropagation: () => undefined,
        isPropagationStopped: () => false,
        persist: () => undefined,
      } as unknown as React.FormEvent<HTMLFormElement>;
    };

    afterEach(() => {
      // Restore the original FormData after each test
      global.FormData = FormData;
    });

    it('should validate form data against state object', () => {
      const state: TestState = { name: 'Test' };
      const form = new FormData();
      form.append('name', 'NewTest');

      expect(() => verifyFormData(createMockFormEvent(form), state)).not.toThrow();
    });

    it('should throw error for invalid form keys', () => {
      const state: TestState = { name: 'Test' };
      const form = new FormData();
      form.append('invalidKey', 'value');

      expect(() => verifyFormData(createMockFormEvent(form), state)).toThrow(
        'Invalid form data keys: invalidKey',
      );
    });

    it('should throw error when form is undefined', () => {
      const state: TestState = { name: 'Test' };

      expect(() =>
        verifyFormData(undefined as unknown as React.FormEvent<HTMLFormElement>, state),
      ).toThrow('Cannot read properties of undefined');
    });

    it('should throw error when state is undefined', () => {
      const form = new FormData();

      expect(() =>
        verifyFormData(createMockFormEvent(form), undefined as unknown as object),
      ).toThrow('State is null');
    });
  });
});
