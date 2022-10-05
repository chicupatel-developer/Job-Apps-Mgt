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
using Microsoft.AspNetCore.Http;

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

        // react ok
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
                    // return StatusCode(400, _response);
                    return BadRequest("Personal Info Null - Bad Request!");
                }

                // Technical Skills List<string>
                List<string> skills = new List<string>();
                skills = myResume.Skills;
                if (skills == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    // return StatusCode(400, _response);
                    return BadRequest("Skills Null - Bad Request!");
                }

                // Work Experience
                List<WorkExperience> workExps = new List<WorkExperience>();
                workExps = myResume.WorkExperience;
                if (workExps == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    // return StatusCode(400, _response);
                    return BadRequest("Work Experience Null - Bad Request!");
                }

                // Education              
                List<Education> educations = new List<Education>();
                educations = myResume.Education;
                if (educations == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Bad Request!";
                    return BadRequest("Education Null - Bad Request!");
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
                    // return File(pdfBytes, "application/pdf", "your_resume.pdf");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Memory File Creation Error! (OR) Server Error!");
                }                
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Error!");                
            }                  
        }

        // react wip
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
                    _response.ResponseMessage = "Personal Info Null - Bad Request!";
                    // return StatusCode(400, _response);
                    return BadRequest("Personal Info Null - Bad Request!");
                }
                
                // Technical Skills List<string>
                List<string> skills = new List<string>();
                skills = myResume.Skills;
                if (skills == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Skills Null - Bad Request!";
                    return BadRequest("Skills Null - Bad Request!");
                }                

                // Work Experience
                List<WorkExperience> workExps = new List<WorkExperience>();
                workExps = myResume.WorkExperience;
                if (workExps == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Work Experience Null - Bad Request!";
                    return BadRequest("Work Experience Null - Bad Request!");
                }

                // Education
                List<Education> educations = new List<Education>();
                educations = myResume.Education;
                if (educations == null)
                {
                    _response.ResponseCode = -1;
                    _response.ResponseMessage = "Education Null - Bad Request!";
                    return BadRequest("Education Null - Bad Request!");
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
                    // convert byte[] to memory-stream
                    MemoryStream stream = new MemoryStream(pdfBytes);
                    // create .pdf and attach it as email attachment, but do not store .pdf file on server
                    // var message = new Message(new string[] { myResume.EmailMyResumeTo }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
                    var message = new Message(new string[] { "chicupatel202122@gmail.com" }, "Test mail with Attachments", "This is the content from our mail with attachments.", null, stream, "pdf", "myResume.pdf");
                    await _emailSender.SendEmailAsync(message);

                    return Ok("Resume sent in your Email-Attachment! Please check your Email!");                    
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Sending Email Error! (OR) Server Error!");
                }             
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Error!");
            }          
        }

        // ng ok
        [HttpGet]
        [Route("getUserResumeCreateData")]
        public IActionResult GetUserResumeCreateData()
        {
            var userDatas = _resumeCreator.GetUserResumeCreateData();
            // userDatas = new List<UserResumeCreate>();
            // userDatas = null;
            return Ok(userDatas);
        }

        // ng ok
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
