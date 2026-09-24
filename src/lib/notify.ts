/**
 * Notification bridge — allows infrastructure/application layers to emit
 * notifications WITHOUT importing presentation (UI) code.
 *
 * Usage:
 *   import { notify } from '@/lib/notify'
 *   notify.success('Saved!')
 *
 * The presentation layer subscribes at startup:
 *   import { setNotifyImpl } from '@/lib/notify'
 *   import { toast } from '@/components/ui/Toast'
 *   setNotifyImpl(toast)
 *
 * This satisfies the Dependency Rule: the notify module is in the LIBRARY
 * layer and has zero imports from components/.
 */

type NotifyFn = (message: string, id?: string) => void

interface Notifier {
  success: NotifyFn
  error:   NotifyFn
  info:    NotifyFn
  loading: (message: string) => string | number | undefined
  dismiss: (id?: string) => void
}

let _impl: Notifier = {
  success: (m)  => console.log('[notify:success]', m),
  error:   (m)  => console.error('[notify:error]', m),
  info:    (m)  => console.info('[notify:info]', m),
  loading: (m)  => { console.log('[notify:loading]', m); return undefined },
  dismiss: ()   => {},
}

export function setNotifyImpl(impl: Notifier) {
  _impl = impl
}

export const notify: Notifier = {
  success: (m, id)  => _impl.success(m, id),
  error:   (m, id)  => _impl.error(m, id),
  info:    (m, id)  => _impl.info(m, id),
  loading: (m)      => _impl.loading(m),
  dismiss: (id)     => _impl.dismiss(id),
}
