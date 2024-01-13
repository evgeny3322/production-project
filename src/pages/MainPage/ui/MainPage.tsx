import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';
import { Input } from 'shared/ui/Input/Input';

const MainPage = () => {
    const { t } = useTranslation('main');

    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <div>
            <BugButton />
            {t('main:Главная страница')}
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Input autoFocus placeholder="Введите текст" onChange={onChange} value={value} />
        </div>
    );
};

export default MainPage;
