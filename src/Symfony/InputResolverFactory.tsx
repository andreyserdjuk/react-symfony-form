import {BirthdayResolver} from "./InputResolver/BirthdayResolver";
import {ButtonResolver} from "./InputResolver/ButtonResolver";
import {CheckboxResolver} from "./InputResolver/CheckboxResolver";
import {ChoiceResolver} from "./InputResolver/ChoiceResolver";
import {DateResolver} from "./InputResolver/DateResolver";
import {EmailResolver} from "./InputResolver/EmailResolver";
import {IntegerResolver} from "./InputResolver/IntegerResolver";
import {MoneyResolver} from "./InputResolver/MoneyResolver";
import {NumberResolver} from "./InputResolver/NumberResolver";
import {PasswordResolver} from "./InputResolver/PasswordResolver";
import {RadioResolver} from "./InputResolver/RadioResolver";
import {PercentResolver} from "./InputResolver/PercentResolver";
import {UrlResolver} from "./InputResolver/UrlResolver";
import {TextResolver} from "./InputResolver/TextResolver";
import {TextareaResolver} from "./InputResolver/TextareaResolver";
import {SubmitResolver} from "./InputResolver/SubmitResolver";
import {SearchResolver} from "./InputResolver/SearchResolver";
import {ResetResolver} from "./InputResolver/ResetResolver";
import {RangeResolver} from "./InputResolver/RangeResolver";
import {DelegatingSingleInputResolver} from "./DelegatingSingleInputResolver";
import {InputResolverInterface} from "./InputResolverInterface";

export class InputResolverFactory {
    static getResolver():InputResolverInterface {
        const resolver = new DelegatingSingleInputResolver();

        resolver.addResolver(new BirthdayResolver);
        resolver.addResolver(new ButtonResolver);
        resolver.addResolver(new CheckboxResolver);
        resolver.addResolver(new ChoiceResolver);
        resolver.addResolver(new DateResolver);
        resolver.addResolver(new EmailResolver);
        resolver.addResolver(new IntegerResolver);
        resolver.addResolver(new MoneyResolver);
        resolver.addResolver(new NumberResolver);
        resolver.addResolver(new PasswordResolver);
        resolver.addResolver(new PercentResolver);
        resolver.addResolver(new RadioResolver);
        resolver.addResolver(new RangeResolver);
        resolver.addResolver(new ResetResolver);
        resolver.addResolver(new SearchResolver);
        resolver.addResolver(new SubmitResolver);
        resolver.addResolver(new TextareaResolver);
        resolver.addResolver(new TextResolver);
        resolver.addResolver(new UrlResolver);

        return resolver;
    }
}