import IParserMailTemplateDTO from '@shared/container/providers/MailTemplateProvider/dtos/IParserMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParserMailTemplateDTO): Promise<string>;
}
