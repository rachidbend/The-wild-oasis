import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://nvgfxspilajhjuhshwjz.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52Z2Z4c3BpbGFqaGp1aHNod2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5MjAwODYsImV4cCI6MjAxNDQ5NjA4Nn0.BHUMRjhECV4-0A_U_oQ6jSOW1-yqz-mTanNrOSQyQMw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
