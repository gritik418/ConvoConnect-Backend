const resetPasswordSuccessTemplate = () => {
    return `<head>
  <title></title>
  <!--[if !mso]><!-- -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
  #outlook a { padding: 0; }
  .ReadMsgBody { width: 100%; }
  .ExternalClass { width: 100%; }
  .ExternalClass * { line-height:100%; }
  body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
  p { display: block; margin: 13px 0; }
</style>
<!--[if !mso]><!-->
<style type="text/css">
  @media only screen and (max-width:480px) {
    @-ms-viewport { width:320px; }
    @viewport { width:320px; }
  }
</style>
<!--<![endif]-->
<!--[if mso]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
<!--[if lte mso 11]>
<style type="text/css">
  .outlook-group-fix {
    width:100% !important;
  }
</style>
<![endif]-->

<!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">

        @import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);

    </style>
  <!--<![endif]--><style type="text/css">
  @media only screen and (min-width:480px) {
    .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
  }
</style>
</head>
<body style="background: #F9F9F9;">
  <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]-->
  <style type="text/css">
    html, body, * {
      -webkit-text-size-adjust: none;
      text-size-adjust: none;
    }
    a {
      color:#1EB0F4;
      text-decoration:none;
    }
    a:hover {
      text-decoration:underline;
    }
  </style>
<div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
      <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"><img alt="" title="" height="38px" src=${`${process.env.CLIENT_URL}/images/logo-black.png`} style="border:none;border-radius:;display:block;outline:none;text-decoration:none;width:100px;height:50px;" width="138"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;"><!--[if mso | IE]>
      <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:640px;">
        <v:fill origin="0.5, 0" position="0.5,0" type="tile" src="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png" />
        <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
      <![endif]--><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#7289DA url(https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png) top center / cover no-repeat;" align="center" border="0" background="https://cdn.discordapp.com/email_assets/f0a4cc6d7aaa7bdf2a3c15a193c6d224.png"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:57px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:undefined;width:640px;">
      <![endif]--><div style="cursor:auto;color:white;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:36px;font-weight:600;line-height:36px;text-align:center;">ConvoConnect</div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table><!--[if mso | IE]>
        </v:textbox>
      </v:rect>
      <![endif]--></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 70px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
      <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px 0px 20px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:20px;text-align:left;">
             <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Congratulations!<br/> Your Password Changed Successfully. </h1><p><img src=${`${process.env.CLIENT_URL}/images/reset-password-success.jpg`} alt="img" title="None" style="height: auto;width: 90%;max-width: 500px;"></p>

    
     <p style="margin: 0;">Dear user,<br /> <br />This is to confirm that the password for your account has been <strong>successfully changed</strong> on your request for Reset Password with <strong>ConvoConnect</strong>. Your account is now secured with the new password that you have set.<br /><br />You can now use your new password for accessing your account on <strong>ConvoConnect</strong>.<br /><br />If you did not change your password, please contact us immediately to report any unauthorized access to your account.</p>

          </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate;" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:white;cursor:auto;padding:15px 19px;" align="center" valign="middle" bgcolor="#7289DA"><a href=${`${process.env.CLIENT_URL}/login`} style="text-decoration:none;line-height:100%;background:#7289DA;color:white;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:15px;font-weight:normal;text-transform:none;margin:0px;" target="_blank">
            Login
          </a></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:0px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
      <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;"><div style="font-size:1px;line-height:12px;">&nbsp;</div></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--><div style="margin:0 auto;max-width:640px;background:#ffffff;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden;"><table cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;font-size:0px;padding:0px;"><!--[if mso | IE]>
      <table border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
      <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]-->
      <!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="640" align="center" style="width:640px;">
        <tr>
          <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
      <![endif]--><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td style="vertical-align:top;width:640px;">
      <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
      • Sent by ConvoConnect •
    </div></td></tr><tr><br/><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Whitney, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;padding:20px;">
       You received this email because your ConvoConnect Account's Password has been successfully changed. If you didn't request this action contact us immediately.
    </div></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
      </td></tr></table>
      <![endif]--></div>

</body>`;
};
export default resetPasswordSuccessTemplate;
