export default function LoginValidation(values: any) {
  const error: any = {};
  const { username, password, companyId } = values;
  if (!username) {
    error.username = <div className="text-xs">Username harus di isi.</div>;
  }
  if (!password) {
    error.password = <div className="text-xs">Password harus di isi.</div>;
  }
  if (!companyId) {
    error.companyId = <div className="text-xs">ID Salon harus di isi.</div>;
  }
  return error;
}
