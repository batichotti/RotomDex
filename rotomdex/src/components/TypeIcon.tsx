import { capitalize } from '@/utils/utils'

export default function TypeIcon({ primary_type, secondary_type }: { primary_type: string; secondary_type?: string }) {
    return (
        <>
            <p>Tipo: {capitalize(primary_type)}</p>
            <p>Tipo Secundário: {capitalize(secondary_type ?? '')}</p>
        </>
    )
}
