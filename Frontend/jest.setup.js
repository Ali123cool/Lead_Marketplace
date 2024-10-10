// jest.setup.js
import '@testing-library/jest-dom/extend-expect';
jest.mock('../src/Api/SupabaseClient', () => require('../src/__mocks__/supabaseClient'));
