/**
 * Interface para envio de notificaciones de solicitud
 */

export type ReceiverOrganization = {
  id: string;
  role: string;
};

export interface RequestOrganization {
  message: string;
  receivers: ReceiverOrganization[];
  transmitterId: string;
  contextNotification: string;
  code: string;
}
