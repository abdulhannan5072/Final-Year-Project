// import React, { Component } from "react";
// import { ModalDialog, Modal } from "../../shared/components";
// import { Button } from "antd";
// import Create from "./Create";
// import { Formik, Field, Form } from "formik";
// import * as Yup from "yup";

// const initialValues = {
//   taskName: "",
//   status: "",
//   description: "",
//   url: "",
//   linkText: "",
//   assignTo: "",
//   attachment: "",
//   startDate: "",
//   dueDate: "",
//   createdBy: "",
// };

// const validationSchema = Yup.object().shape({
//   taskName: Yup.string().min(3, "Too Short!").required("Required"),
//   status: Yup.string().required("Required"),
//   assignTo: Yup.string().required("Required"),
//   startDate: Yup.string().required("Required"),
//   dueDate: Yup.string().required("Required"),
// });

// class ModalTask extends Component {
//   onSubmit = (values) => {
//     console.log(values);
//   };

//   render() {
//     return (
//       <div>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={this.onSubmit}
//         >
//           {(props) => (
//             <Form>
//               <Modal
//                 // title="Create Task"
//                 {...this.props}
//                 // actions={
//                 //   <div className="d-flex">
//                 //     <Button onClick={this.props.onClose}>Cancel</Button>
//                 //     <Button
//                 //       type="primary"
//                 //       className="ml-3 mr-2"
//                 //       htmlType="submit"
//                 //       onClick={props.handleSubmit}
//                 //     >
//                 //       Save
//                 //     </Button>
//                 //   </div>
//                 // }
//               >
//                 <Create {...props} onClose={this.props.onClose} />
//               </Modal>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     );
//   }
// }

// export default ModalTask;
