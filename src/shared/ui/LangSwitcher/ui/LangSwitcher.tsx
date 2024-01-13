import { classNames } from 'shared/lib/classNames/classNames';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher: FC<LangSwitcherProps> = (props) => {
    const {
        className,
        short,
    } = props;

    const { t, i18n } = useTranslation();
    const toggle = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
    };
    return (
        <Button
            className={classNames('', {}, [className])}
            theme={ButtonTheme.CLEAR}
            onClick={toggle}
        >
            {t(short ? 'короткий-язык' : 'язык')}
        </Button>
    );
};
