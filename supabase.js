import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://licxscfugsrfwaamzcep.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxpY3hzY2Z1Z3NyZndhYW16Y2VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5MTUyNTcsImV4cCI6MjA4OTQ5MTI1N30.lwx48fEX5UJn7P5KDNvouVRm3iJQPid6KvDZU6ZSSLA'

export const supabase = createClient(supabaseUrl, supabaseKey)