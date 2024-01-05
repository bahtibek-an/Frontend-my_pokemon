function Footer() {
  return (
    <div className="footer flex justify-center my-3">
      <div className="flex justify-around">
        <a href="https://github.com/davronme" target="_blank">
          <img
            className="mx-2"
            width="28px"
            height="28px"
            src="/github.png"
            alt="github"
          />
        </a>

        <a href="https://t.me/davron_ergasheev" target="_blank">
          <img
            className="mx-2"
            width="28px"
            height="28px"
            src="/telegram.png"
            alt="linkedin"
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
