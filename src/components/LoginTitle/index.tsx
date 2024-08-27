export function LoginTitle({ signUp }: { signUp: boolean }) {
  return (
    <span className="flex flex-col items-center gap-6">
      <img src="icons/phlox-logo.png" alt="" className="w-[200px]" />
      <p className="text-center text-typo-700 text-section-subtitle font-medium">
        {signUp
          ? <>
            <strong>Bem vindo!</strong> <br />
            Cadastre-se e acompanhe as últimas notícias da PHLOX
          </>
          : <>
            <strong>Bem vindo de volta!</strong> <br />
            Confira suas notificações para ter certeza de estar atualizado!
          </>}
      </p>
    </span>
  );
}