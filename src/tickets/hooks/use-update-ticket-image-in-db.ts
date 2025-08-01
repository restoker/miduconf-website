import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { TICKET_DB_KEY } from '../config/ticket-db-key'

interface Props {
  filename: string
  file: File
}

export const useUpdateTicketImageInDB = () => {
  const supabase = useSupabaseClient()

  const handleUpdateImageTicket = async ({ filename, file }: Props) => {
    const { error, data } = await supabase.storage.from(TICKET_DB_KEY).upload(filename, file, {
      cacheControl: '3600',
      upsert: true
    })

    if (error) {
      console.error('[update-ticket-image-error]: ', error)
    }

    return {
      error,
      data
    }
  }

  return {
    handleUpdateImageTicket
  }
}
