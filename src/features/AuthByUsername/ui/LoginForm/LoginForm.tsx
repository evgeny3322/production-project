import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import {
    DynamicModuleLoader,
    ReducerList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginUserName } from '../../model/selectors/getLoginUserName/getLoginUserName';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUserName } from '../../model/service/loginByUserName/loginByUserName';
import s from './LoginForm.module.scss';

export interface LoginFormProps {
    className?: string
}

const initialReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation(['login', 'input']);
    const dispatch = useDispatch();

    const userName = useSelector(getLoginUserName);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeUserName = useCallback((value: string) => {
        dispatch(loginActions.setUserName(value));
    }, [dispatch]);

    const onChangePassword = useCallback((password: string) => {
        dispatch(loginActions.setPassword(password));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUserName({ password, userName }));
    }, [dispatch, password, userName]);

    return (
        <DynamicModuleLoader
            removeAfterUnmount
            reducers={initialReducers}
        >
            <div className={classNames(s.LoginForm, {}, [className])}>
                <Text title={t('login:форма-авторизации')} />
                {error && <Text text={t('login:errorLogin')} theme={TextTheme.ERROR} />}
                <Input
                    type="text"
                    autoFocus
                    className={s.input}
                    placeholder={t('input:userName')}
                    onChange={onChangeUserName}
                    value={userName}
                />
                <Input
                    type="text"
                    className={s.input}
                    placeholder={t('input:password')}
                    onChange={onChangePassword}
                    value={password}
                />
                <Button
                    className={s.loginBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('login:войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
