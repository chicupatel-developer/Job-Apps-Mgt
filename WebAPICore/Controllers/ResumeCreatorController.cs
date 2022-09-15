using WebAPICore.DTO;
using EFCore.DBFirst_SQLTOLINQ_Models;
using EFCore.Models;
using EmailService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ResumeService;
using ResumeService.Models;
using SelectPdf;
using Services.DTO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebAPICore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResumeCreatorController : ControllerBase
    {
        private APIResponse _response;

        private readonly IResumeCreator _resumeCreator;
        private readonly IEmailSender _emailSender;

        public ResumeCreatorController(IResumeCreator resumeCreator,IEmailSender emailSender)
        {
            _resumeCreator = resumeCreator;
            _emailSender = emailSender;
        }

        // ng ok
        // create pdf resume as byte[] and display @ browser
        [HttpPost]
        [Route("createAndDownloadResume")]
        public IActionResult CreateAndDownloadResume(MyResume myResume)
        {
            _response = new APIResponse();

            try
            {

                // throw new Exception();

                // instantiate a html to pdf converter object
                HtmlToPdf converter = _resumeCreator.GetHtmlToPdfObject();

                // prepare data
                // incoming from angular
                // Personal Info
                PersonalInfo personalInfo = new PersonalInfo();
                personalInfo = myResume.PersonalInfo;
                if (personalInfo == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                // Technical Skills List<string>
                List<string> skills = new List<string>();
                skills = myResume.Skills;
                if (skills == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                // Work Experience
                List<WorkExperience> workExps = new List<WorkExperience>();
                workExps = myResume.WorkExperience;
                if (workExps == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                // Education
                List<Education> educations = new List<Education>();
                educations = myResume.Education;
                if (educations == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                var content = _resumeCreator.GetPageHeader() +
                                _resumeCreator.GetPersonalInfoString(personalInfo) +
                                _resumeCreator.GetTechnicalSkillsString(skills) +
                                _resumeCreator.GetWorkExperienceString(workExps) +
                                _resumeCreator.GetEducationString(educations) +
                                _resumeCreator.GetPageFooter();

                // create pdf as byte[] and display @ browser
                var pdf = converter.ConvertHtmlString(content);
                var pdfBytes = pdf.Save();


                // UserResumeCreate db-table
                // process to add client's ip address and datetime
                // and PersonalInfo>FirstName and LastName @ db
                var hostName = System.Net.Dns.GetHostName();
                var ips = System.Net.Dns.GetHostAddresses(hostName);
                StringBuilder myIpAddress = new StringBuilder();
                foreach (var ip in ips)
                {
                    myIpAddress.Append(ip.ToString() + ",");
                }
                UserResumeCreate userData = new UserResumeCreate()
                {
                     FirstName = personalInfo.FirstName,
                      LastName = personalInfo.LastName,
                       ResumeCreatedAt = DateTime.Now,
                        UserIPAddress = myIpAddress.ToString().Substring(0,(myIpAddress.ToString().Length))
                };
                if (_resumeCreator.AddUserDataWhenResumeCreated(userData))
                {
                    return File(pdfBytes, "application/pdf");
                }
                else
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Server Error!";
                    return StatusCode(500, _response);
                }                
            }
            catch(Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
                return StatusCode(500, _response);
            }                  
        }


        // ng ok
        // create pdf resume as byte[] 
        // and attach it as email attachment, but do not store .pdf file on server
        [HttpPost]
        [Route("createAndEmailResume")]
        public async Task<ActionResult> createAndEmailResume(MyResume myResume)
        {
            _response = new APIResponse();
            try
            {
                // throw new Exception();

                // instantiate a html to pdf converter object
                HtmlToPdf converter = _resumeCreator.GetHtmlToPdfObject();

                // prepare data
                // incoming from angular
                // Personal Info
                PersonalInfo personalInfo = new PersonalInfo();
                personalInfo = myResume.PersonalInfo;
                if (personalInfo == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                // Technical Skills List<string>
                List<string> skills = new List<string>();
                skills = myResume.Skills;
                if (skills == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }                

                // Work Experience
                List<WorkExperience> workExps = new List<WorkExperience>();
                workExps = myResume.WorkExperience;
                if (workExps == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                // Education
                List<Education> educations = new List<Education>();
                educations = myResume.Education;
                if (educations == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return StatusCode(400, _response);
                }

                var content = _resumeCreator.GetPageHeader() +
                                _resumeCreator.GetPersonalInfoString(personalInfo) +
                                _resumeCreator.GetTechnicalSkillsString(skills) +
                                _resumeCreator.GetWorkExperienceString(workExps) +
                                _resumeCreator.GetEducationString(educations) +
                                _resumeCreator.GetPageFooter();

                var pdf = converter.ConvertHtmlString(content);
                var pdfBytes = pdf.Save();


                // UserResumeEmail db-table
                // process to add client's email address and datetime
                // and PersonalInfo>FirstName and LastName @ db
                // this will input by user from angular 
                // myResume.EmailMyResumeTo = "chicupatel202122@gmail.com";
                myResume.EmailMyResumeTo = "ankitjpatel2007@hotmail.com";
                UserResumeEmail userData = new UserResumeEmail()
                {
                    FirstName = personalInfo.FirstName,
                    LastName = personalInfo.LastName,
                    ResumeEmailedAt = DateTime.Now,
                    UserEmail = myResume.EmailMyResumeTo
                };
                if (_resumeCreator.AddUserDataWhenResumeEmailed(userData))
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Sending Email Error! (OR) Server Error!";
                    return StatusCode(500, _response);

                    /*
                    // convert byte[] to memory-stream
                    MemoryStream stream = new MemoryStream(pdfBytes);
                    // create .pdf and attach it as email attachment, but do not store .pdf file on server
                    // var message = new Message(new string[] { myResume.EmailMyResumeTo }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
                    var message = new Message(new string[] { "chicupatel202122@gmail.com" }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
                    await _emailSender.SendEmailAsync(message);

                    return Ok("Resume sent in your Email-Attachment! Please check your Email!");
                    */
                }
                else
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Sending Email Error! (OR) Server Error!";
                    return StatusCode(500, _response);
                }             
            }
            catch(Exception ex)
            {
                _response.ResponseCode = -1;
                _response.ResponseMessage = "Server Error!";
                return StatusCode(500, _response);
            }          
        }

        [HttpGet]
        [Route("getUserResumeCreateData")]
        public IActionResult GetUserResumeCreateData()
        {
            var userDatas = _resumeCreator.GetUserResumeCreateData();
            // userDatas = new List<UserResumeCreate>();
            // userDatas = null;
            return Ok(userDatas);
        }

        [HttpGet]
        [Route("getUserResumeEmailData")]
        public IActionResult GetUserResumeEmailData()
        {
            var userDatas = _resumeCreator.GetUserResumeEmailData();
            // userDatas = new List<UserResumeEmail>();
            // userDatas = null;
            return Ok(userDatas);
        }

    }
}
