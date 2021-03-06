import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from '../../../schemas/organization.schema';
import { SuccessResponse } from '../../../models/global/success-response.model';
import { RequestInvitation } from '../../../schemas/request-invitation';
import { User } from '../../../schemas/user.schema';
import { RequestInvitationDTO, InvitationRequestReceivedDTO } from '../dto/request-invitation.dto';
import { IRequestInvitation } from '../interface/IRequestInvitation.interface';
import { InvitationRequest } from '../model/invitation-request.model';
import { RequestInvitationsSuccess, RequestInvitationSuccess } from '../type/request-invitation.type';

@Injectable()
export class RequestInvitationService implements IRequestInvitation {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(RequestInvitation.name)
    private readonly requestInvitationModel: Model<RequestInvitation>,
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(notification: InvitationRequest): RequestInvitationSuccess {
    try {
      const transmitter = await this.userModel.findOne({
        _id: notification.tramsmitterId,
      });

      const receiver = await this.userModel.findOne({
        _id: notification.receiver.id,
      });

      const createRequest = await this.requestInvitationModel.create({
        message: notification.message,
        receiver: receiver,
        transmitter: transmitter,
        code: notification.code,
        notificationType: notification.notificationType,
        role: notification.receiver.role,
      });

      await createRequest.save();

      return RequestInvitationDTO.transform(createRequest);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(id: string): RequestInvitationsSuccess {
    try {
      const user = await this.userModel.findOne({ _id: id });

      if (!user) {
        return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
      }

      const invitations = await this.requestInvitationModel.find({ receiver: user, available: true }).populate('transmitter');

      return {
        body: invitations.map(e => RequestInvitationDTO.transform(e)),
        status: HttpStatus.OK,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateNotification(notification: InvitationRequestReceivedDTO, id: string): SuccessResponse {
    try {
      const requestNotification = await this.requestInvitationModel.findOne({ _id: id }).exec();

      if (notification.accept) {
        return await this.acceptOrganization(requestNotification);
      }
      return await this.rejectOrganization(requestNotification);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async acceptOrganization(requestInvitation: RequestInvitation): SuccessResponse {
    try {
      const newMember = await this.userModel
        .findOne({
          _id: requestInvitation.receiver._id,
        })
        .exec();

      await this.requestInvitationModel.updateOne({ _id: requestInvitation._id }, { available: false }).exec();

      await this.userModel.updateOne({ _id: requestInvitation.receiver._id }, { role: requestInvitation.role }).exec();

      await this.organizationModel.updateOne({ _id: requestInvitation.code }, { $push: { members: await newMember._id } }).exec();
      return {
        body: { message: 'Invitación acpetada con éxito' },
        status: HttpStatus.OK,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async rejectOrganization(requestInvitation: RequestInvitation): SuccessResponse {
    try {
      const removedUser = await this.userModel
        .findOne({
          _id: requestInvitation.receiver._id,
        })
        .exec();

      await this.organizationModel.updateOne({ _id: requestInvitation.code }, { $pull: { guestUser: await removedUser._id } }).exec();

      await this.requestInvitationModel.updateOne({ _id: requestInvitation._id }, { available: false }).exec();

      return {
        body: { message: 'Solicitud rechazada con éxito' },
        status: HttpStatus.OK,
      };
    } catch (error) {
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
